import { Request, Response } from "express";
import { UserManagementService } from "./usermanagement.service";
import jwt from "jsonwebtoken";

require('dotenv').config();


export class UserManagementController {
    public constructor(private readonly userService: UserManagementService) {
        this.userService = userService;
    }

    public getAllUsers = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.userService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          
                        if(findUser?.UserTypeId === 3) {
                            return this.userService
                              .findAllUsers()
                              .then(async (users) => {
                                  if(users && users.length > 0) {
                                    return res.status(200).json(users);
                                  }
                                  else {
                                      return res.status(404).json("No user exists!");
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

    public updateUserStatus = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        const UId = parseInt(req.params.UserId);
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.userService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 3) {
                                return this.userService
                                  .findUser(UId)
                                  .then((userbyId) => {
                                      if(userbyId) {
                                          console.log(userbyId)
                                        if(userbyId.IsApprovedUser) {
                                            return this.userService
                                            .deactivateUser(userbyId.Email)
                                            .then((u) => {
                                                if(u) {
                                                    return res.status(200).json(`User ${userbyId.FirstName + " " + userbyId.LastName} deactivated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return this.userService
                                            .activateUser(userbyId.Email)
                                            .then((u) => {
                                                if(u) {
                                                    return res.status(200).json(`User ${userbyId.FirstName + " " + userbyId.LastName} activated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                      }
                                      else {
                                          return res.status(404).json("No user found with this Email");
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

}