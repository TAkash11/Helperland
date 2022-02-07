import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { LoginService } from "./login.service";
import bcrypt from "bcrypt";

require("dotenv").config();

export class LoginController {
  public constructor(private readonly loginService: LoginService) {
    this.loginService = loginService;
  }

  public Login: RequestHandler = async (req,res): Promise<Response> => {
    return this.loginService
      .getUserByEmail(req.body.Email)
      .then(async (user: User | null) => {
        if (user) {
          const register = this.loginService.isApproved(user);
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
}