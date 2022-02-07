import { User } from "../models/user";
import { LoginRepository } from "./login.repository";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

export class LoginService {
  public constructor(private readonly loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }
  public async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.loginRepository.getUserByEmail(userEmail);
  }

  public isApproved(user:User){
    return user.IsApprovedUser; 
  }
  public async comparePassword(enteredPassword:string,Password:string):Promise<boolean>{
    const same = await bcrypt.compare(enteredPassword, Password);
    return same;
  }

  public createToken(userEmail:string):string{
    const token = jwt.sign({userEmail},process.env.SECRET_KEY!,{expiresIn:'1h'});
    return token;
  }
}