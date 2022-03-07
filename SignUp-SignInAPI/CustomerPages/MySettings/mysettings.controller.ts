import { Request, Response } from "express";
import { User } from "../../models/user";
import { SettingsService } from "./mysettings.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserAddress } from "../../models/useraddress";

require('dotenv').config();
const saltRouds: number = 10;

export class SettingsController {
    public constructor(private readonly settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public updateUserDetails = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const {Email} = user;
                    if(Email) {
                        const UserEmail = Email;
                        const FirstName = req.body.FirstName;
                        const LastName = req.body.LastName;
                        const Mobile = req.body.Mobile;
                        const DateOfBirth = req.body.DateOfBirth;
                        return this.settingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                            if(findUser) {
                                return this.settingsService
                                  .updateUserDetails( UserEmail, FirstName, LastName, Mobile, DateOfBirth )
                                  .then((user) => {
                                        return res.status(200).json({ 
                                            FirstName: FirstName, 
                                            LastName: LastName,
                                            Email: Email,
                                            Mobile: Mobile,
                                            DateOfBirth: DateOfBirth 
                                        });
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("No user found with this email!");
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

    public updateUserAddress = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const { Email } = user;
                    if(Email) {
                        const AddressLine1 = req.body.AddressLine1;
                        const AddressLine2 = req.body.AddressLine2;
                        const City = req.body.City;
                        const State = req.body.State;
                        const PostalCode = req.body.PostalCode;
                        const Mobile = req.body.Mobile;
                        return this.settingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                              if(findUser) {
                                  return this.settingsService
                                    .findByAddressId(+req.params.Id)
                                    .then((id) => {
                                        if(id) {
                                            if(findUser.Email === id.Email) {
                                                return this.settingsService
                                                .updateUserAddress( +req.params.Id, AddressLine1, AddressLine2, City, State, PostalCode, Mobile )
                                                .then((address) => {
                                                    return res.status(200).json({
                                                        Address: AddressLine1 + ', ' + AddressLine2 + ', ' + City + ', ' + State + ', ' + PostalCode,
                                                        PhoneNumber: Mobile
                                                    });
                                                })
                                                .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(404).json("Enter valid Id!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Id not found!");
                                        }
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                              }
                              else {
                                  return res.status(404).json("No user found with this email!");
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

    public deleteAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(findUser) {
                              return this.settingsService
                                .findByAddressId(+req.params.Id)
                                .then((id) => {
                                    if(id) {
                                        if(findUser.Email === id.Email) {
                                            return this.settingsService
                                            .deleteAddress(+req.params.Id)
                                            .then((address) => {
                                              return res.status(200).json("Address deleted Successfully!");
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error : error });
                                            });
                                        }
                                        else {
                                            return res.status(404).json("Enter valid Id");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Id not found!");
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error : error });
                                });
                          }
                          else {
                            return res.status(404).json("No user found with this email!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error : error });
                    });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public changePassword = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                          .findUserByEmail(user.Email)
                          .then(async (findUser) => {
                              if(findUser) {
                                  const isOld = bcrypt.compare(req.body.OldPassword, findUser.Password);
                                  if(!isOld) {
                                    return res.status(400).json("Incorrect Old Password!");
                                  }
                                  else {
                                    if(req.body.OldPassword === req.body.NewPassword) {
                                        return res.status(400).json("Choose different password other than older one!");
                                    }
                                    else {
                                        if(req.body.NewPassword !== req.body.ConfirmPassword) {
                                            return res.status(400).json("New Password & Confirm Password is not matching!");
                                        }
                                    }
                                  }
                                  req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                  return this.settingsService
                                    .changePassword(user.Email, req.body.NewPassword)
                                    .then(async (user) => {
                                        return res.status(200).status(200).json("Password changed Successfully!");     
                                    })
                                    .catch((error: Error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                              }
                              else {
                                  return res.status(404).json("User not exist!");
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
            return res.status(404).json("Token not exists!");
        }
    };

}