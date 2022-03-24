import {db} from "../models/index";
import {User} from "../models/user";
import {UserAddress} from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";
import { FavoriteAndBlocked } from "../models/favoriteandblocked";
import { ServiceRequestAddress } from "../models/servicerequestaddress";
import { ServiceRequestExtra } from "../models/servicerequestextra";
import { Op } from "sequelize";

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

    public async getHelpersByZipcode(zipCode:string): Promise<User[]> {
        return db.User.findAll({where:{UserTypeId:2, ZipCode:zipCode}});
    }
    
    public async createUserAddress(userAddress: {[key: number|string]:UserAddress}): Promise<UserAddress>{
        return db.UserAddress.create(userAddress);
    }

    public async createService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest, {include: ['ServiceRequestAddress', 'ExtraService' ]});
    }

    public async getHelpersBlockedCustomer(userId:number, helperId:number[]): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:{[Op.or]:helperId}, TargetUserId:userId, IsBlocked:true}});
    }

    public async getBlockedHelper(userId:number, helperIds:number[]):Promise<FavoriteAndBlocked[]|null>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId, TargetUserId:{[Op.or]: helperIds}, IsBlocked:true}});
    }

    public async getFavoriteAndBlocked(userId:number): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({where:{UserId:userId, IsFavorite:true, IsBlocked:false}});
    }
}