import {db} from "../models/index";
import {User} from "../models/user";
import {UserAddress} from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";
import { ServiceRequestAddress } from "../models/servicerequestaddress";
import { ServiceRequestExtra } from "../models/servicerequestextra";

export class BookServiceRepository{

    public async getHelpers(): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:2}});
    }
    public async getUserByEmail(Email:string): Promise<User | null>{
        return db.User.findOne({where: {Email: Email}}); 
    }

    public async getAddresses(userId:number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({where:{UserId:userId}});
    }

    public async createUserAddress(userAddress: {[key: number|string]:UserAddress}): Promise<UserAddress>{
        return db.UserAddress.create(userAddress);
    }

    public async getHelperByZC(ZipCode:string): Promise<User[]> {
        return db.User.findAll({ where: {UserTypeId: 2,ZipCode:ZipCode} });
    }

    public async createService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest, {include: ['ServiceRequestAddress', 'ExtraService' ]});
    }
}