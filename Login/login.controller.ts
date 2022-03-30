import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { LoginService } from "./login.service";
import bcrypt from "bcrypt";

require("dotenv").config();

export class LoginController {
  public constructor(private readonly loginService: LoginService) {
    this.loginService = loginService;
  }

  public Login = async (req: Request, res: Response): Promise<Response> => {
    return this.loginService
      .getUserByEmail(req.body.Email)
      .then(async (user: User | null) => {
        if (user) {
          const register = this.loginService.isApprovedUser(user);
          if (register) {
            const isSame = await bcrypt.compare(
              req.body.Password,
              user.Password!
            );
            if (isSame) {
              const token = this.loginService.createToken(user.Email!);
              if(user.UserTypeId === 1){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful user" });
              }
              else if(user.UserTypeId === 2){
                return res
                  .status(200)
                  .cookie("token", token, { httpOnly: true, expires:new Date(Date.now()+600000) })
                  .json({ message: "login successful helper" });
              }
            }
            return res
              .status(401)
              .json({ message: "Invalid Username or Password" });
          }
          return res.json({ message: "Active your account" });
        }
        return res
          .status(401)
          .json({ message: "Invalid Username or Password" });
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({
          error: error,
        });
      });
  };
  public validateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if(token == null) {
      return res.status(401).json("You aren't logged in");
    }
    jwt.verify(token, process.env.SECRET_KEY!, (error, decodedToken: any) => {
      if(error) {
        return res.status(400).json("Something Wrong");
      }
      const { Email } = decodedToken;
      if(Email){
        return this.loginService
          .getUserByEmail(Email)
          .then((user) => {
            if(user === null) {
              return res.status(404).json("User not found!");
            }
            else {
              next();
            }
          })
          .catch((error: Error) => {
            return res.status(500).json({ error });
          });
        }
    });
  };
}