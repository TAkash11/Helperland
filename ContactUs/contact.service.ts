import { ContactUs } from "../models/contactus";
import { ContactUsRepository } from "./contact.repository";

export class ContactUsService{
    public constructor(private readonly usersRepository: ContactUsRepository) {
        this.usersRepository = usersRepository;
    }

    public async createUsers(users:{[key: number|string]:ContactUs}): Promise<ContactUs> {
        return this.usersRepository.createUsers(users);
    }
    public async getUserById(userId:number): Promise<ContactUs |null> {
        return this.usersRepository.getUserById(userId);
    }

    public async getall(): Promise<ContactUs[]> {
        return this.usersRepository.getall();
    }

}