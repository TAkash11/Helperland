import { Request, Response, RequestHandler } from "express";
import { ServiceRequestService } from "./NewServiceRequest.service";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceRequestController {
  public constructor(private readonly serviceRequestService: ServiceRequestService) {
    this.serviceRequestService = serviceRequestService;
  }

  public getAllNewServiceRequests: RequestHandler = async (req, res): Promise<Response | undefined> => {
    const token = req.headers.authorization || req.header('auth');
  
    if(token){
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {

        if(error) {
          return res.status(400).json("Invalid Login!");
        }else{
          return this.serviceRequestService
                      .findUser(user.Email)
                      .then((user) => {
                        if (user?.UserTypeId === 2) {
                          if (user.UserId) {
                            return this.serviceRequestService
                              .getHelperDetailbyId(user.UserId)
                              .then((helper) => {
                                if (helper) {
                                  if (helper.ZipCode === null) {
                                    return res.status(404).json({
                                      message:
                                        "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area",
                                    });
                                  } else {
                                    return this.serviceRequestService
                                      .getAllPendingServiceRequestByZipcode(
                                        helper.ZipCode!,
                                        helper.UserId
                                      )
                                      .then(async (serviceRequests) => {
                      
                                        if (serviceRequests && serviceRequests.length>0) 
                                          {  
                                            const requestDetail =await this.serviceRequestService.displayRequestDetail(serviceRequests);
                                            
                                            return res.status(200).json(requestDetail);
                                        } else {
                                          return res
                                            .status(404)
                                            .json({ message: "service requests not found" });
                                        }
                                      })
                                      .catch((error: Error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                      });
                                  }
                                } else {
                                  return res.status(404).json({ message: "helper not found" });
                                }
                              })
                              .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error: error });
                              });
                          } else {
                            return res
                              .status(422)
                              .json({ message: "helperId not found in request body" });
                          }
                        } else {
                          return res.status(401).json({ message: "unauthorised user" });
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

  public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response |undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const SId = parseInt(req.params.ServiceId);
    console.log(SId)

    if(token) {
       jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
          if(error) {
              return res.status(400).json("Invalid Login!");
          }
          else {
              return this.serviceRequestService
                 .findUser(user.Email)
                 .then((findUser) => {
                  if(findUser?.UserTypeId === 2) {
                    return this.serviceRequestService
                     .getServiceById(SId, findUser.ZipCode)
                     .then(async (service) => {
                            
                              let details : Object[] = [];
                              if(service) {
                                  const userdetails = await this.serviceRequestService.getUserDetailbyId(service.UserId);
                                  const addressdetails = await this.serviceRequestService.findAddressById(service.ServiceRequestId);
                                  const extradetails = await this.serviceRequestService
                                  
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
                                  console.log(service.ServiceRequestId)
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

  public acceptableNewServiceRequestOrNot: RequestHandler = async (req,res,next): Promise<Response | undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const SId = parseInt(req.params.ServiceId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceRequestService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceRequestService
                            .getServiceById(SId, findUser.ZipCode)
                            .then((service) => {
                                if(service) {
                                    req.body.ZipCode = service.ZipCode;
                                    return this.serviceRequestService
                                      .getAllServiceRequestsOfHelper(findUser.UserId)
                                      .then(async (serviceReq) => {
                                          req.body.totalHour = service.ExtraHours! + service.ServiceHours;
                                        if(serviceReq) {
                                            const { srId, matched } = await this.serviceRequestService.FutureSameDateAndTime( service.ServiceStartDate, serviceReq, req.body.totalHour, service.ServiceStartTime );
                                            if(matched) {
                                                return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
                                            }
                                            else {
                                                next();
                                            }
                                        }
                                        else {
                                            next();
                                        }
                                      })
                                      .catch((error: Error) => {
                                          return res.status(500).json({ error: error });
                                      });
                                }
                                else {
                                    return res.status(404).json("Service is assigned to another service provider!");
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
            return res.status(404).json("No token exists!!");
        }
  };

  public acceptNewServiceRequest: RequestHandler = async (req,res): Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const SId = parseInt(req.params.ServiceId);

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceRequestService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceRequestService
                                .acceptNewServiceRequest(SId, findUser.UserId)
                                .then((s) => {
                                    if(s) {
                                        return this.serviceRequestService
                                        .getHelpersByZipCode(req.body.ZipCode)
                                        .then(async (sp) => {
                                            if(sp) {
                                                const users = sp.filter((s) => {
                                                    return findUser.UserId !== s.UserId;
                                                });
                                                let email  =await this.serviceRequestService.getEmail(users, req.body);
                                                for(let e in email) {
                                                    const serviceReq = await this.serviceRequestService.createData(email[e], SId);
                                                    await mg.messages().send(serviceReq);
                                                }
                                            }
                                            return res.status(200).json("Service Request is accepted by you successfully!");
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                                    }
                                    else {
                                        return res.status(400).json("Error in accepting service!");
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
            return res.status(404).json("No token exists!!");
        }
  };
}