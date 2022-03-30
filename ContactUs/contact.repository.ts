import {db} from "../models/index"
import {ContactUs} from "../models/contactus"

export class ContactUsRepository{

    public async createUsers(users: {[key: number|string]:ContactUs}): Promise<ContactUs>{
        return db.ContactUs.create(users);
    }

    public async getall(): Promise<ContactUs[]> {
        return db.ContactUs.findAll();
    }

    public async getUserById(userId:number): Promise<ContactUs |null> {
        return db.ContactUs.findOne({where: {ContactUsId: userId}});    
    }

}