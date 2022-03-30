import { Request, Response } from "express";
import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { HistoryService } from "./history.service";
import { db } from "../../models";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { ServiceRequest } from "../../models/servicerequest";
import moment from "moment";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class HistoryController {
  public constructor(private readonly HistoryService: HistoryService ) {
    this.HistoryService = HistoryService;
  }

  public history = async (req: Request, res: Response): Promise<Response | void> =>{
    const token = req.headers.authorization || req.header('auth');
    if(token){
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
        if(error) {
            return res.status(400).json("Invalid Login!");
        }
        else{
          return this.HistoryService
          .findUser(user.Email)
          .then((user) => {
            if(user?.UserTypeId === 1) {
              return this.HistoryService.getServiceRequestHistoryOfUser(user.UserId)
              .then(requestHistory => {
                if(requestHistory){
                  if(requestHistory.length>0){
                    const pastDateHistory = this.HistoryService.compareDateWithCurrentDate(requestHistory);
                    if(requestHistory.length>0){
                      return res.status(200).json(pastDateHistory);
                    }else{
                      return res.status(404).json({message:'Service request history not found in past'});
                    }
                  }else{
                    return res.status(404).json({message:'Service request history not found'});
                  }
                }else{
                  return res.status(404).json({message:'Service request history not found'});
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({
                  error: error,
                });
              });
            }
            else{
              return res.status(400).json("You are not Customer, Please login with you customer account!");
            }
          
          })
          .catch((error: Error) => {
            return res.status(500).json({ error: error });
          });
          
        }
      }) 
    }
    else{
      return res.status(400).json("Some error occurred!");
    }

};

  public getServiceById = async (req: Request, res: Response): Promise<Response | void> =>{
    const token = req.headers.authorization || req.header('auth');
    const SId = parseInt(req.params.ServiceId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.HistoryService
                      .findUser(user.Email)
                      .then((user) => {
                        // console.log(user)
                          if(user?.UserTypeId === 1) {
                            return this.HistoryService
                            .getServiceById(SId)
                            .then((service) => {
                              console.log(service)
                                if(service) {
                                    if(user.UserId === service.UserId) {
                                        return res.status(200).json(service);
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
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
                            return res.status(400).json("You are not Customer, Please login with you customer account!");
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


  public giveRatings = async (req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization || req.header('auth');
    const SRId = parseInt(req.params.ServiceRequestId);
    req.body.RatingDate = new Date();

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.HistoryService
                      .findUser(user.Email)
                      .then((user) => {
                          if(user?.UserTypeId === 1) {
                            return this.HistoryService
                              .getRatingsById(SRId)
                              .then((rating) => {
                                  if(rating) {
                                      return res.status(400).json("You already gave Ratings!");
                                  }
                                  else {
                                      if(SRId) {
                                          return this.HistoryService
                                            .getServiceByRequestId(SRId)
                                            .then((service) => {
                                                if(service) {
                                                    req.body.ServiceRequestId = service.ServiceRequestId;
                                                    if(user.UserTypeId === 1 && user.UserId === service.UserId) {
                                                        req.body.RatingFrom = service.UserId;
                                                        if(service.Status === 2 || service.ServiceProviderId) {
                                                            req.body.RatingTo = service.ServiceProviderId;
                                                            req.body.Ratings = this.HistoryService.getRatings(req.body);
                                                            return this.HistoryService
                                                              .giveRatings(req.body)
                                                              .then((ratings) => {
                                                                return res.status(200).json(ratings);
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json({ error: error });
                                                              });
                                                        }
                                                        else {
                                                            return res.status(400).json("Service Request not completed or ServiceProvider Not found!");
                                                        }
                                                    }
                                                    else {
                                                        return res.status(400).json("Please login using your cutomer account!");
                                                    }
                                                }
                                                else {
                                                    return res.status(404).json("No service exists!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                      }
                                      else {
                                          return res.status(400).json("Service Request Id not exists!");
                                      }
                                  }
                              })
                              .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              });
                          }
                          else {
                            return res.status(400).json("You are not Customer, Please login with you customer account!");
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


}