import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookService.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../models/servicerequest";

export class BookService {
    public constructor(private readonly bookServiceRepository: BookServiceRepository) {
      this.bookServiceRepository = bookServiceRepository;
    }

    public async getHelpers(): Promise<User[]> {
    return this.bookServiceRepository.getHelpers();
    }

    public async getUserByEmail(Email: string): Promise<User | null> {
      return this.bookServiceRepository.getUserByEmail(Email);
    }
    
    public async getAddress(userId:number): Promise<UserAddress[]> {
      return this.bookServiceRepository.getAddresses(userId);
    }

    public async createUserAddress(userAddress: {[key: number | string]: UserAddress;}): Promise<UserAddress> {
      return this.bookServiceRepository.createUserAddress(userAddress);
    }
    
    public createToken(Email: string, postalCode: string): string {
        const token = jwt.sign({ Email, postalCode }, process.env.SECRET_KEY!, {
          expiresIn: "3h",
        });
        return token;
    }

    public async getHelperByZC(ZipCode: string): Promise<User[]> {
      return this.bookServiceRepository.getHelperByZC(ZipCode);
    }

    public async createService(serviceRequest: {[key: number | string]: ServiceRequest;}): Promise<ServiceRequest> {
      return this.bookServiceRepository.createService(serviceRequest);
    }

    public serviceRequest(Email: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created!</h2>
            <p>Logged in to your account to accept Service Request.</p>
            </body></html>`
        }
        return data;
    }

}