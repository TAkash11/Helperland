import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user";
import { ForgotService } from "./forgotPassword.service";

import mailgun from "mailgun-js";
import { json } from "sequelize";

require("dotenv").config();
const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

const saltRounds: number = 10;

export class ForgottController {
  public constructor(private readonly forgotService: ForgotService) {
    this.forgotService = forgotService;
  }

  public forgotPassword: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    const Email: string = req.body.Email;
    if (Email) {
      return this.forgotService
        .getUserByEmail(Email)
        .then((User) => {
          if (!User) {
            return res
              .status(400)
              .json({ message: "User with this email does not exist" });
          }
          const resetLink = this.forgotService.createToken(User.UserId);
          const data = this.forgotService.createData(User.Email!, resetLink);
          mg.messages().send(data, function (error, body) {
            if (error) {
              return res.json({
                error: error.message,
              });
            }
          });
          return res
            .status(200)
            .json({
              message:
                "An email has been sent to your account. Click on the link in received email to reset the password",
            });
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json(error);
        });
    } else {
      return res.status(400).json({ message: "Email does not exist" });
    }
  };
}