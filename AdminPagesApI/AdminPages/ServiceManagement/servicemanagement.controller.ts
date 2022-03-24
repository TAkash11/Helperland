import { Request, Response, NextFunction } from "express";
import { ServiceManagementService, filterData } from "./servicemanagement.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";

require('dotenv').config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceManagementController {
    public constructor(private readonly ServiceManagementService: ServiceManagementService) {
        this.ServiceManagementService = ServiceManagementService;
    }

    public serviceRequests = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        const filterData: filterData = req.body;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.ServiceManagementService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 3) {
                            return this.ServiceManagementService
                                  .findAllService()
                                  .then(async (sr) => {
                                      if(sr && sr.length > 0) {
                                          if(req.body) {
                                            const serviceArray = await this.ServiceManagementService.findService(sr, filterData);
                                            if(serviceArray && serviceArray.length > 0) {
                                                return res.status(200).json(serviceArray);
                                            }
                                            else {
                                                return res.status(200).json("No Filtered service exists!");
                                            }
                                          }
                                          else {
                                            return res.status(200).json(sr);
                                          }
                                      }
                                      else {
                                        return res.status(400).json("No service exists!");
                                      }
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                        }
                        else {
                            return res.status(400).json("You are not Admin, Login Restricted!");
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

    public rescheduleIfTimeSlotNotConflicts = async(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        const SId = parseInt(req.params.ServiceId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    if(SId) {
                        return this.ServiceManagementService
                          .findUser(user.Email)
                          .then((finduser) => {
                              if(finduser && finduser.UserTypeId === 3) {
                                const date = req.body.ServiceStartDate;
                                return this.ServiceManagementService
                                  .findBySId(SId)
                                  .then((serviceReq) => {
                                      if(!serviceReq) {
                                        return res.status(404).json("No service found with this Id!");
                                      }
                                      if(serviceReq?.Status === 2) {
                                        return res.status(400).json("Service is completed, you can't reschedule it!");
                                      }
                                      else{
                                        if((new Date(req.body.ServiceStartDate).getTime() === new Date(serviceReq?.ServiceStartDate!).getTime()) && (req.body.ServiceStartTime === serviceReq?.ServiceStartTime)) {
                                            return this.ServiceManagementService
                                                .updateAddress(SId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                                                .then(async (address) => {
                                                    const email = await this.ServiceManagementService.getEmails(serviceReq!);
                                                    for(let e in email) {
                                                        const sendmail = this.ServiceManagementService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], serviceReq?.ServiceId!, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                                        mg.messages().send(sendmail);
                                                    }
                                                    if(serviceReq?.Status === 3) {
                                                        return this.ServiceManagementService
                                                          .updateStatus(+req.params.ServiceRequestId)
                                                          .then((status) => {
                                                            return res.status(200).json(`Service Request with Service Id #${serviceReq?.ServiceId} rescheduled successfully!`);
                                                          })
                                                          .catch((error: Error) => {
                                                              return res.status(500).json({ error: error });
                                                          });
                                                    }
                                                    return res.status(200).json(`Service Request with Service Id #${serviceReq?.ServiceId} rescheduled successfully!`);
                                                })
                                                .catch((error: Error) => {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                });
                                        }
                                        else {
                                            req.body.totalHour = serviceReq?.ServiceHours! + serviceReq?.ExtraHours!;
                                            if(serviceReq?.ServiceProviderId) { 
                                                req.body.ServiceProviderId = serviceReq.ServiceProviderId;
                                                    return this.ServiceManagementService
                                                      .findByAllSPId(serviceReq.ServiceProviderId)
                                                      .then(async (serviceReq) => {
                                                          if(serviceReq) {
                                                              const { startDate,  isMatch, startTime, endTime, ServiceId } = 
                                                                await this.ServiceManagementService
                                                                  .SPHasFutureSameDateTime (req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime);
                                                                  if(isMatch) {
                                                                      return res.status(200).json(`Another service request of ServiceId #${ServiceId} has been assigned to the service provider on ` + startDate +" from " + startTime +
                                                                      " to " + endTime +". Either choose another date or pick up a different time slot.");
                                                                  }
                                                                  else {
                                                                      next();
                                                                  }
                                                          }
                                                          else {
                                                              next();
                                                          }
                                                      })
                                            }
                                            else {
                                                next();
                                            }
                                        }
                                      }
                                  })
                                  .catch((error: Error) => {
                                    console.log(error);
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
                    else {
                        return res.status(404).json("ServiceId not exists!");
                    }
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public RescheduleWithAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const date = req.body.ServiceStartDate;
        const SId = parseInt(req.params.ServiceId);
        return this.ServiceManagementService
        .findBySId(SId)
        .then((service) => {
             if(service) {
                return this.ServiceManagementService
                  .updateService(+req.params.ServiceRequestId, new Date(date), req.body.ServiceStartTime)
                  .then(async (s) => {
                      return this.ServiceManagementService
                          .updateAddress(SId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                          .then(async (address) => {
                              const email = await this.ServiceManagementService.getEmails(service!);
                              for(let e in email) {
                                  const sendmail = this.ServiceManagementService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], service?.ServiceId!, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                  mg.messages().send(sendmail);
                              }
                              if(service?.Status === 3) {
                                return this.ServiceManagementService
                                  .updateStatus(SId)
                                  .then((status) => {
                                    return res.status(200).json(`Service Request with Service Id #${service?.ServiceId} rescheduled successfully!`);
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                              }
                              return res.status(200).json(`Service Request with Service Id #${service?.ServiceId} rescheduled successfully!`);
                          })
                          .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                          });
                  })
                  .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({ error: error });
                      });
            }
            else {
                return res.status(404).json("No service exists!");
            }
        })
        .catch((error: Error) => {
            return res.status(500).json({ error: error });
        });
                              
    };

    public cancleServiceRequest = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization 
        const SId = parseInt(req.params.ServiceId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.ServiceManagementService
                      .findUser(user.Email)
                      .then((user) => {
                          if(user?.UserTypeId === 3) {
                            return this.ServiceManagementService
                              .findByServiceId(SId)
                              .then((service) => {
                                if(service?.Status === 3) {
                                    return res.status(400).json("Service request already cancelled!");
                                }
                                else {
                                    if(service?.Status !== 2) {
                                        for(let s in service) {
                                            return this.ServiceManagementService
                                              .updateServiceStatus(SId)
                                              .then(async (serviceRequest) => {
                                                if(serviceRequest && serviceRequest.length > 0) {
                                                    const email = await this.ServiceManagementService.getEmails(service);
                                                    for(let e in email) {
                                                        const sendmail = this.ServiceManagementService.cancleService(email[e], service.ServiceId);
                                                        mg.messages().send(sendmail);
                                                    }
                                                    return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Cancellation of service is failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        return res.status(400).json("Service Request is completed, You can't cancle it!");
                                    }
                                }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not Admin, Login Restricted!");
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