import { User } from "../models/user";
import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class UserService {
    public constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async getUserByEmail(Email: string): Promise<User | null> {
        return this.userRepository.getUserByEmail(Email);
    };
    public async CustomerSignup(User: User): Promise<User> {
        return this.userRepository.CustomerSignup(User);
    };
    public async HelperSignup(User: User): Promise<User> {
        return this.userRepository.HelperSignup(User);
    };
    public async updateUser(userIsregistered:boolean, userEmail: string): Promise<[number, User[]]>{
        return this.userRepository.updateUser(userIsregistered,userEmail);
    };
    public createData(Email:string, token:string):typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Customer SignUp Confirmation',
            html: `<h2>Your Account has been created at helperland</h2>
            <a href="http://localhost:3000/helperland/activate/${token}">Please click here to activate you account</a>`
                  
        }
        return data;
    }
    public createToken(userEmail:string):string{
        const token = jwt.sign({userEmail},process.env.JWT_ACC_ACTIVATE!,{expiresIn:'1h'});
        return token;
      }

}