import { User } from "../models/user";
import { UserRepository } from "./user.repository";
import jwt from "jsonwebtoken";

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
    public createData(Email:string):typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Customer SignUp Confirmation',
            html: `<h2>Your Account has been created at helperland</h2>`
                  
        }
        return data;
    }

}