import { Request, Response, RequestHandler } from "express";
import { BlockCustomerService } from "./BlockCustomer.service";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class BlockCustomerController {
  public constructor(private readonly blockCustomerService: BlockCustomerService) {
    this.blockCustomerService = blockCustomerService;
  }

  public getCustomerWorkedWithHelper:RequestHandler = async(req, res):Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.blockCustomerService
                  .findUser(user.Email)
                  .then(async (findUser) => {
                      if(findUser && findUser.UserTypeId === 2) {
                            const cust = await this.blockCustomerService.findAllcustSpHadWorkedFor(findUser.UserId);
                            if(cust) {
                                if(cust.length > 0) {
                                    return res.status(200).json(cust);
                                }
                                else {
                                    return res.status(404).json("Customer not found!");
                                }
                            }
                            else {
                                return res.status(404).json("No customer exists!");
                            }
                        }
                        else {
                            return res.status(404).json("User not exists!");
                        }
                  })
                  .catch((error: Error) => {
                      return res.status(500).json(error);
                  });
            }
        });
    }
    else {
        return res.status(404).json("No token exists!");
    }
  };

  public addCustomerInBlockList: RequestHandler = async(req, res, next):Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const UId = parseInt(req.params.userId);
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.blockCustomerService
                  .findUser(user.Email)
                  .then((findUser) => {
                      if(findUser && findUser.UserTypeId === 2) {
                        req.body.UserId = findUser.UserId;
                        req.body.TargetUserId = UId;
                        return this.blockCustomerService
                          .findServiceBySpId(findUser.UserId)
                          .then((service) => {
                              if(service) {
                                const cId = this.blockCustomerService.findAllcustIdSpHadWorkedFor(service);
                                if(cId.length > 0) {
                                    const custArray = cId.includes(UId);
                                    if(custArray) {
                                        if(req.body.IsBlocked) {
                                            return this.blockCustomerService
                                              .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                                              .then((customer) => {
                                                  if(customer) {
                                                    if(customer.IsBlocked) {
                                                        return res.status(400).json("Customer already in blocked list!");
                                                    }
                                                    else {
                                                        return this.blockCustomerService
                                                          .updateBlockedCust(req.body)
                                                          .then((updateCust) => {
                                                              if(updateCust.length > 0) {
                                                                  return res.status(200).json("Customer addedd in blocked list!");
                                                              }
                                                              else {
                                                                  return res.status(400).json("Failure in adding customer in blocked list!");
                                                              }
                                                          })
                                                          .catch((error: Error) => {
                                                            return res.status(500).json(error);
                                                          });
                                                    }
                                                  }
                                                  else {
                                                    req.body.IsFavorite = false;
                                                    return this.blockCustomerService
                                                      .createBlockedCust(req.body)
                                                      .then((blockedCust) => {
                                                          if(blockedCust) {
                                                              return res.status(200).json("Blocked customer created successfully!");
                                                          }
                                                          else {
                                                              return res.status(404).json("Failure in creating blocked customer!");
                                                          }
                                                      })
                                                      .catch((error: Error) => {
                                                        return res.status(500).json(error);
                                                      });
                                                  }
                                              })
                                              .catch((error: Error) => {
                                                  return res.status(500).json(error);
                                              });
                                        }
                                        else if(req.body.IsBlocked === false) {
                                            next();
                                        }
                                        else {
                                            return res.status(404).json("Not Found!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Service Provider not worked for customer in past!");
                                    }
                                }
                                else {
                                    return res.status(404).json("SP not worked with any customer in past!");
                                }
                              }
                              else {
                                  return res.status(404).json("Service not exists!");
                              }
                          })
                          .catch((error: Error) => {
                            return res.status(500).json(error);
                          });
                      }
                      else {
                          return res.status(404).json("No Sp exists!");
                      }
                  })
                  .catch((error: Error) => {
                      return res.status(500).json(error);
                  });
            }
        });
    }
    else {
        return res.status(404).json("No token exists!");
    }
  };
  public removeCustomerFromBlockList:RequestHandler = async(req, res):Promise<Response|undefined> => {
    const token = req.headers.authorization || req.header('auth');
    const UId = parseInt(req.params.userId);
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.blockCustomerService
                  .findUser(user.Email)
                  .then((findUser) => {
                      if(findUser && findUser.UserTypeId === 2) {
                        return this.blockCustomerService
                          .findBlockedCust(findUser.UserId, UId)
                          .then((blocked) => {
                              if(blocked) {
                                if(blocked.IsBlocked) {
                                    return this.blockCustomerService
                                      .updateBlockedCust(req.body)
                                      .then((blockedCust) => {
                                          if(blockedCust) {
                                              return res.status(200).json("Blocked Customer updated successfully!");
                                          }
                                          else {
                                              return res.status(400).json("Updation failed!");
                                          }
                                      })
                                      .catch((error: Error) => {
                                        return res.status(500).json(error);
                                      });
                                }
                                else if(blocked.IsBlocked === false) {
                                    return res.status(400).json("Customer already in unblocked list!");
                                }
                                else {
                                    return res.status(404).json("No customer exists to remove!");
                                }
                              }
                              else {
                                return res.status(404).json("No customer exists!");
                              }
                          })
                          .catch((error: Error) => {
                            return res.status(500).json(error);
                          });
                      }
                      else {
                          return res.status(404).json("No Sp Exists!");
                      }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json(error);
                  });
            }
        });
    }
    else {
        return res.status(404).json("No token exists!");
    }
  };

}