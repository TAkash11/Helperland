import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { UserService } from "./user.service";
import mailgun from "mailgun-js";
import bcrypt from "bcrypt";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

const saltRounds: number = 10;

export class UserController {
    public constructor(private readonly UserService: UserService) {
        this.UserService = UserService;
    };
   
    public CustomerSignup: RequestHandler = async (req,res): Promise<Response> => {
        const isequal = req.body.Password === req.body.ConfirmPassword;
        if(!isequal){
            return res.status(401).json("Enter same Password in Both fields");
        } else{
            return this.UserService
            .getUserByEmail(req.body.Email)
            .then(async(User : User|null)=>{
              if(!User){
                req.body.Password = await bcrypt.hash(req.body.Password,saltRounds);
                return this.UserService
                 .CustomerSignup(req.body)
                 .then((User: User) => {
                   const token = this.UserService.createToken(User.Email);
                   const data = this.UserService.createData(User.Email!,token);
                   mg.messages().send(data, function (error, body) {
                     if (error) {
                       return res.status(303).json({
                         error: error.message
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

      public HelperSignup = async (req: Request, res: Response): Promise<Response> => {
        const isequal = req.body.Password === req.body.ConfirmPassword;
        if(!isequal){
            return res.status(401).json("Enter same Password in Both fields");
        } else{
            return this.UserService
            .getUserByEmail(req.body.Email)
            .then(async(User : User|null)=>{
              if(!User){
                req.body.Password = await bcrypt.hash(req.body.Password,saltRounds);
                return this.UserService
                .HelperSignup(req.body)
                .then((User: User) => {
                  const token = this.UserService.createToken(User.Email!);
                  const data = this.UserService.createData(User.Email!,token);
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
      public activateUser: RequestHandler = async (req,res): Promise<Response | undefined> => {
        const { token } = req.params;
        if (token) {
          jwt.verify(token,process.env.JWT_ACC_ACTIVATE!,(error, decodedToken: any) => {
              if (error) {
                return res.status(400).json({ error: "Incorrect or Expired link" });
              }
              const { userEmail } = decodedToken;
              if (userEmail) {
                return this.UserService
                  .getUserByEmail(userEmail)
                  .then((user) => {
                    if (user) {
                      user.IsRegisteredUser = true;
                      return this.UserService
                        .updateUser(user.IsRegisteredUser, user.Email!)
                        .then((user) => {
                          return res.status(200)
                          .json({message: "You are now successfully registered",user});
                        })
                        .catch((error: Error) => {
                          console.log(error);
                          return res.status(500).json(error);
                        });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json(error);
                  });
              }
            }
          );
        } else {
          return res.json({ error: "Something went wrong!!!" });
        }
      };
     
}
