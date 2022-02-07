import { userInfo } from "os";
import { db } from "../models/index";
import { User } from "../models/user";

export class UserRepository {

    public async CustomerSignup(User: User): Promise<User> {
        const {FirstName,LastName,Email,Password,Mobile,DateOfBirth} = User;
        return db.User.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            UserTypeId: 1,
            DateOfBirth: DateOfBirth,
            IsRegisteredUser: false,
            IsApprovedUser: true
        });
    }
    public async HelperSignup(User: User): Promise<User> {
        const {FirstName,LastName,Email,Password,Mobile,DateOfBirth} = User;
        return db.User.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            UserTypeId: 2,
            DateOfBirth: DateOfBirth,
            IsRegisteredUser: false,
            IsApprovedUser: true
        });
    }
    public async getUserByEmail(Email: string): Promise<User|null>{
        return db.User.findOne({ where: {Email: Email} });

    }
    
}