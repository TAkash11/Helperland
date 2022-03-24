import { UserAddress } from "../models/useraddress";
import { User } from "../models/user";
import { BookServiceRepository } from "./bookService.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";

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

    public async createService(serviceRequest: {[key: number | string]: ServiceRequest;}): Promise<ServiceRequest> {
      return this.bookServiceRepository.createService(serviceRequest);
    }

    public async getHelpersByZipCode(zipCode:string): Promise<User[]> {
      return this.bookServiceRepository.getHelpersByZipcode(zipCode);
    }
    
    public createToken(Email: string, postalCode: string): string {
        const token = jwt.sign({ Email, postalCode }, process.env.SECRET_KEY!, {
          expiresIn: "3h",
        });
        return token;
    }

    public serviceRequest(Email: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created!</h2>
            <p>Log in to your account to accept Service Request.</p>
            </body></html>`
        }
        return data;
    }
    // public async createFavoriteAndBlocked(fandb: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
    //   return this.bookServiceRepository.createFavoriteAndBlocked(fandb);
    // }
  
    public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
      return this.bookServiceRepository.getFavoriteAndBlocked(userId);
    }

    public async getBlockedHelper(userId:number, helpers:User[]):Promise<FavoriteAndBlocked[]|null>{
      const helperIds:number[] = [];
      for(let us in helpers){
        helperIds.push(helpers[us].UserId);
      }
      return this.bookServiceRepository.getBlockedHelper(userId, helperIds);
    }
    public async removeHelperBlockedLoginCustomer(userId:number, helpers:User[]):Promise<User[]>
  {
    const helperIds:number[] = [];
    // console.log(helpers);
    for(let hp in helpers){
      helperIds.push(helpers[hp].UserId);
    }
    const blockedCustomer  = await this.bookServiceRepository.getHelpersBlockedCustomer(userId, helperIds);
    // console.log(blockedCustomer);
    let filteredHelper = helpers.filter((sr) =>{
          return !blockedCustomer.find((rm) => {
            return (rm.UserId === sr.UserId)
          }
        )} 
      );
    // console.log(filteredHelper);
    return filteredHelper;

  }
  public getEmailAddressForSendEmail(user:User[], body:any){
    let Email =[];
      for (let count in user) {
        Email.push(user[count].Email!);
      }
    
    return Email;

  }

  public removeBlockedHelper(user:User[], blockedHelpers:FavoriteAndBlocked[]):User[]{

    const users = user.filter((item) =>{
      return blockedHelpers.every((f) => {
        return f.TargetUserId !== item.UserId;
      });
    });
    return users;

  }

}