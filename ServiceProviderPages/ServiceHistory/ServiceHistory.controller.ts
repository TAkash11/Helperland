import { Request, Response, RequestHandler } from "express";
import { ServiceHistoryService } from "./ServiceHistory.service";
import mailgun from "mailgun-js";
import exceljs from "exceljs";
import jwt from "jsonwebtoken";


require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceHistoryController {
  public constructor(private readonly serviceHistoryService: ServiceHistoryService) {
    this.serviceHistoryService = serviceHistoryService;
  }

  public getCompletedServiceRequest:RequestHandler = async(req, res):Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceHistoryService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 2) {
                            return this.serviceHistoryService
                            .getAllCompletedRequest(findUser.ZipCode)
                            .then(async (service) => {
                                if(service && service.length > 0) {
                                    const serviceDetails = await this.serviceHistoryService.serviceReq(service);
                                    if(serviceDetails.length > 0) {
                                        return res.status(200).json(serviceDetails);    
                                    }      
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                }
                                else {
                                    return res.status(400).json("No service exists!!!");
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(400).json("You are not SP, Please login with you SP account!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
  };

  public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const SId = parseInt(req.params.ServiceId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceHistoryService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceHistoryService
                            .getServiceById(SId, findUser.ZipCode)
                            .then(async (service) => {
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.serviceHistoryService.findUserById(service.UserId);
                                    const addressdetails = await this.serviceHistoryService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.serviceHistoryService
                                      .findExtraById(service.ServiceRequestId)
                                      .then((extra) => {
                                          let ExtraService: Object[] = [];
                                          if(extra) {
                                            for(var i=0; i<extra.length; i++) {
                                                const extras = extra[i].ServiceExtraId;
                                                ExtraService.push(extras);
                                            }
                                            return ExtraService;
                                          }
                                      });
                                    const Time = (service.ServiceHours);
                                    const Extra = (service.ExtraHours);
                                    const StartTime = ((service.ServiceStartTime).toString().split(':'));
                                    const total = ((Time+Extra!).toString()).split('.');
                                    var time:string ;
                                    if(StartTime[1] == "30"){
                                        if(total[1] == '5'){
                                            time = (((+StartTime[0])+(+total[0])+1).toString())+":00";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30";
                                        }
                                    }
                                    else{
                                        if(total[1] == '5'){                        
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":00";
                                        } 
                                    }
                                    service.update({EndTime:time});

                                    if(userdetails) {
                                        if(addressdetails) {
                                            await details.push({
                                                ServiceStartDate: service.ServiceStartDate,
                                                ServiceTime: service.ServiceStartTime + " - " + time,
                                                Duration: service.ServiceHours + service.ExtraHours!,
                                                ServiceID: service.ServiceId,
                                                Extras: extradetails,
                                                Payment: service.TotalCost + " €",
                                                CustomerName: userdetails.FirstName + " " + userdetails.LastName,
                                                ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                Comments: service.Comments,
                                            });
                                        }
                                    }

                                    if(details.length > 0) {
                                        return res.status(200).json(details);    
                                    }      
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                }
                                else {
                                    return res.status(404).json("No service request detail found with this service ID!");
                                }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not SP, Please login with your SP account!");
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    
  };

  public exportDataInExcelFormat:RequestHandler = async(req, res):Promise<Response|void> => {
    const SId = parseInt(req.params.ServiceId);
    let exportHistory = [];
    const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceHistoryService
                      .findUser(user.Email)
                      .then(async (findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                              this.serviceHistoryService
                                .getAllCompletedRequest(findUser.ZipCode)
                                .then(async (history) => {
                                    if(history.length > 0) {
                                        const pastHistory = this.serviceHistoryService.compareDate(history);
                                        exportHistory = await this.serviceHistoryService.Export(pastHistory);
                                        let workbook = new exceljs.Workbook();
                                        let worksheet = workbook.addWorksheet('Service History');
                                        worksheet.columns = [
                                          {header: 'Service Id', key: 'ServiceId', width: 10},
                                          {header: 'Service Date', key: 'StartDate', width: 18},
                                          {header: 'Duration', key: 'Duration', width: 18},
                                          {header: 'Customer Name', key: 'CustomerName', width: 18},
                                          {header: 'Customer Address Details', key: 'Address', width: 25}
                                        ];
                                        worksheet.addRows(exportHistory);
          
                                        worksheet.getRow(1).eachCell((cell) => {
                                          cell.font = {bold: true};
                                        });
          
                                        workbook.xlsx.writeFile('SP_ServiceHistory_' + findUser.UserId + '.xlsx')
                                        .then((service) => {
                                          return res.status(200).json("Data exported successfully!");
                                        })
                                        .catch((error: Error) => {
                                            console.log(error);
                                          return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {

                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                });
                          }
                          else {
                              return res.status(404).json("User not exists!");
                          }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public displayRatingsOfHelper = async (req: Request, res: Response): Promise<Response | undefined> => {
    const token = req.headers.authorization || req.header('auth');

      if(token) {
          jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
              if(error) {
                  return res.status(400).json("Invalid Login!");
              }
              else {
                  return this.serviceHistoryService
                    .findUser(user.Email)
                    .then((findUser) => {
                      if(findUser?.UserTypeId === 2) {
                          return this.serviceHistoryService
                          .getAllRatings(findUser.UserId)
                          .then(async (ratings) => {
                              if(ratings && ratings.length > 0) {
                                  const getAllRatings = await this.serviceHistoryService.Ratings(ratings);
                                  if(getAllRatings.length > 0) {
                                      return res.status(200).json(getAllRatings);
                                  }
                                  else {
                                      return res.status(404).json("No ratings found!");
                                  }
                              }
                              else {
                                  return res.status(400).json("No rating exists!");
                              }
                          })
                          .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                          });
                      }
                      else {
                          return res.status(400).json("You are not SP, Please login with you SP account!");
                      }
                    })
                    .catch((error: Error) => {
                        console.log(error);
                      return res.status(500).json({ error: error });
                    });
              }
          });
      }
      else {
          return res.status(400).json("Some error occurred!");
      }
  };
  
}