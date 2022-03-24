import { User } from "../models/user";
import { LoginRepository } from "./login.repository";
import jwt from "jsonwebtoken";


export class LoginService {
  public constructor(private readonly loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }
  public async getUserByEmail(userEmail: string): Promise<User | null> {
    return this.loginRepository.getUserByEmail(userEmail);
  }

  public isApprovedUser(user:User){
    return user.IsApprovedUser; 
  }
  // public async comparePassword(enteredPassword:string,Password:string):Promise<boolean>{
  //   const same = await bcrypt.compare(enteredPassword, Password);
  //   return same;
  // }

  public createToken(Email:string):string{
    const token = jwt.sign({Email},process.env.SECRET_KEY!,{expiresIn:'2h'});
    return token;
  }
}