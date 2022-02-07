import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { UserService } from "./user.service";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class UserController {
    public constructor(private readonly UserService: UserService) {
        this.UserService = UserService;
    };
   
    public CustomerSignup = async (req: Request, res: Response): Promise<Response> => {
        const isequal = req.body.Password === req.body.ConfirmPassword;
        if(!isequal){
            return res.status(401).json("Enter same Password in Both fields");
        } else{
            return this.UserService
            .getUserByEmail(req.body.Email)
            .then(async(User : User|null)=>{
              if(!User){
                return this.UserService
                .CustomerSignup(req.body)
                .then((User: User) => {
                  const data = this.UserService.createData(User.Email!);
                  mg.messages().send(data, function (error, body) {
                    if (error) {
                      return res.status(303).json({
                        error: error.message
                      });
                    }
                  });
                  return res.status(200).json({
                      message:
                        "Email successfully sent,Your account is registered",
                    });
                  })
                .catch((error: Error) => {
                  return res.status(500).json({error: error});
                  });
              }
              else{
                return res.status(401).json("User Exist!! Login!!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({error: error});
              });
                        
        }          
      };    

      public HelperSignup = async (req: Request, res: Response): Promise<Response> => {
        const isequal = req.body.Password === req.body.ConfirmPassword;
        if(!isequal){
            return res.status(401).json("Enter same Password in Both fields");
        } else{
            return this.UserService
            .getUserByEmail(req.body.Email)
            .then(async(User : User|null)=>{
              if(!User){
                return this.UserService
                .HelperSignup(req.body)
                .then((User: User) => {
                  const data = this.UserService.createData(User.Email!);
                  mg.messages().send(data, function (error, body) {
                    if (error) {
                      return res.json({
                        error: error.message,
                      });
                    }
                  });
                  return res.status(200).json({
                      message:
                        "Email successfully sent, kindly active your account",
                    });
                  })
                .catch((error: Error) => {
                  return res.status(500).json({error: error});
                  });
              }
              else{
                return res.status(401).json("User Exist!! Login!!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({error: error});
              });
                        
        }          
      };    
}
