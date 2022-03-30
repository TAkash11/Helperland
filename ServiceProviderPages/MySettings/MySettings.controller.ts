import { Request, Response, RequestHandler } from "express";
import { MySettingsService } from "./MySettings.service";
import mailgun from "mailgun-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();
const saltRouds: number = 10;

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class MySettingsController {
  public constructor(private readonly mySettingsService: MySettingsService) {
    this.mySettingsService = mySettingsService;
  }

  public getUserDetailById = async (req: Request, res: Response): Promise<Response | undefined> => {
    const token = req.headers.authorization || req.header('auth');

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid login!");
            }
            else {
                return this.mySettingsService
                  .findUserByEmail(user.Email)
                  .then((findUser) => {
                      if(findUser && findUser.UserTypeId === 2) {
                          return this.mySettingsService
                            .findByUserId(findUser.UserId)
                            .then((address) => {
                                if(address) {
                                    return res.status(200).json({
                  
                                        FirstName: findUser.FirstName, 
                                        LastName: findUser.LastName,
                                        Email: findUser.Email,
                                        Mobile: findUser.Mobile,
                                        DateOfBirth: findUser.DateOfBirth,
                                        StreetName: address.AddressLine1,
                                        HouseNumber: address.AddressLine2,
                                        PostalCode: address.PostalCode,
                                        City: address.City
                                    });
                                }
                                else {
                                    return res.status(200).json({
                                        
                                        FirstName: findUser.FirstName, 
                                        LastName: findUser.LastName,
                                        Email: findUser.Email,
                                        Mobile: findUser.Mobile,
                                        DateOfBirth: findUser.DateOfBirth,
                                    });
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              });
                      }
                      else {
                          return res.status(404).json("SP not exists!");
                      }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
            }
        });
    }
    else {
        return res.status(404).json("No token exists!");
    }
};

public updateUserDetailById = async (req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization || req.header('auth');

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user:any) => {
            if(error) {
                return res.status(400).json("Invalid login!");
            }
            else {
                const {Email} = user;
                if(Email) {
                    return this.mySettingsService
                      .findUserByEmail(Email)
                      .then((findUser) => {
                        if(findUser) {
                            const FirstName = req.body.FirstName;
                            const LastName= req.body.LastName;
                            const Mobile= req.body.Mobile;
                            const DateOfBirth= req.body.DateOfBirth;
                            return this.mySettingsService
                              .updateSPDetails( findUser.Email, FirstName,LastName,Mobile,DateOfBirth )
                              .then((user) => {
                                  return this.mySettingsService
                                    .findByUserId(findUser.UserId)
                                    .then((address) => {
                                        if(address) {
                                            const StreetName = req.body.AddressLine1;
                                            const HouseNumber = req.body.AddressLine2;
                                            const PostalCode = req.body.PostalCode;
                                            const City = req.body.City;
                                            console.log("Hello")
                                            return this.mySettingsService
                                            .updateUserAddress( findUser.UserId, req.body.AddressLine1, req.body.AddressLine2, req.body.City, req.body.PostalCode, req.body.Mobile)
                                            .then((address) => {
                                              
                                                if(address) {
                                                    return res.status(200).json({
                                                      
                                                        FirstName: FirstName, 
                                                        LastName: LastName,
                                                        Email: findUser.Email,
                                                        Mobile: Mobile,
                                                        DateOfBirth: DateOfBirth,
                                                        StreetName: StreetName,
                                                        HouseNumber: HouseNumber,
                                                        PostalCode: PostalCode,
                                                        City: City
                                                    });
                                                }
                                                else {
                                                    return res.status(400).json("Failure in updating address!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            if((req.body.AddressLine1, req.body.AddressLine2, req.body.PostalCode, req.body.City)) {
                                              req.body.UserId = findUser.UserId;
                                              req.body.Email = findUser.Email;
                                              req.body.IsDeleted = false;
                                              return this.mySettingsService
                                                .createUserAddress(req.body)
                                                .then((address) => {
                                                    if(address) {
                                                      const StreetName = req.body.AddressLine1;
                                                      const HouseNumber = req.body.AddressLine2;
                                                      const PostalCode = req.body.PostalCode;
                                                      const City = req.body.City;
                                                      return res.status(200).json({
                                    
                                                          FirstName: FirstName, 
                                                          LastName: LastName,
                                                          Email: findUser.Email,
                                                          Mobile: Mobile,
                                                          DateOfBirth: DateOfBirth,
                                                          StreetName: StreetName,
                                                          HouseNumber: HouseNumber,
                                                          PostalCode: PostalCode,
                                                          City: City
                                                      });
                                                    }
                                                    else {
                                                        return res.status(400).json("Failure in updating address!");
                                                    }
                                                })
                                                .catch((error: Error) => {
                                                  return res.status(500).json({ error });
                                                });  
                                                  
                                            }else{
                                              return res.status(400).json("Provide address Details!");
                                            }
                                            
                                        }
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                              })
                              .catch((error: Error) => {
                                  return res.status(500).json({ error: error });
                              });
                        }
                        else {
                            return res.status(404).json("No SP found with this email!");
                        }
                      })
                      .catch((error: Error) => {
                          return res.status(500).json({ error: error });
                      });
                }
                else {
                    return res.status(404).json("No email found!");
                }
            }
        });
    }
    else {
        return res.status(400).json("Some error occurred!");
    }
};

public changeUserPassword = async(req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization || req.header('auth');

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.mySettingsService
                  .findUserByEmail(user.Email)
                  .then(async (user) => {
                      if(user && user.UserTypeId === 2) {
                        const isOld = await bcrypt.compare(req.body.OldPassword, user.Password);
                        if(!isOld) {
                            return res.status(400).json("Incorrect Old Password!");
                        }
                        else {
                            if(req.body.NewPassword !== req.body.ConfirmPassword) {
                                return res.status(400).json("New Password & Confirm Password is not matching!");
                            }
                                else {
                                req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                return this.mySettingsService
                                    .changePassword(user.Email, req.body.NewPassword)
                                    .then((password) => {
                                        return res.status(200).json("Password changed Successfully!");
                                    })
                                    .catch((error: Error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                        }
                      }
                      else {
                          return res.status(404).json("SP not found!");
                      }
                  })
                  .catch((error: Error) => {
                      return res.status(500).json(error);
                  });
            }
        });
    }
    else {
        return res.status(404).json("Token not exists!");
    }
};
}