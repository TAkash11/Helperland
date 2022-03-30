import {db} from "../models/index"
import {User} from "../models/user"


export class ForgotRepository{

    public async getUserByEmail(Email:string):Promise<User|null>{
        return db.User.findOne({where:{Email:Email}});
    }

    public async getUserById(UserId:number):Promise<User|null>{
        return db.User.findOne({where:{UserId:UserId}});
    }

    public async updateUser(Password:string, UserId:number):Promise<[number, User[]]>{
        return db.User.update({Password:Password}, {where:{UserId:UserId}});
    }
}