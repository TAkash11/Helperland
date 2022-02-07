import { User } from "../models/user";
import { ForgotRepository } from "./forgotPassword.repository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
require("dotenv").config();



export class ForgotService {
  public constructor(private readonly forgotRepository: ForgotRepository) {
    this.forgotRepository = forgotRepository;
  }

  public async getUserByEmail(userEmail:string):Promise<User|null>{
    return this.forgotRepository.getUserByEmail(userEmail);
  }

  public async getUserById(userId:number):Promise<User|null>{
    return this.forgotRepository.getUserById(userId);
  }

  public createData(userEmail:string, token:string): typeof data{
    const data = {
        from: 'helperland-team@gmail.com',
        to: userEmail,
        subject: 'Account activation link',
        html: `<h2>Please click here to activate you account</h2>
              <a href="${process.env.CLIENT_URL}/reset-password/${token}">Please click here to activate you account</a>`
    }
    return data;
  }

  public createToken(userId:number):string{
      const token = jwt.sign({userId},process.env.FORGOT_PASSWORD!,{expiresIn:'30m'});
      return token;
  }

}