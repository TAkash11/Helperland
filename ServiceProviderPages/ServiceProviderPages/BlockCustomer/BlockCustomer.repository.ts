import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class BlockCustomerRepository {

  public async getUserDetailById(userId: number): Promise<User | null> 
  {
    return db.User.findOne({where:{UserId:userId}});
  };

  public async getCustomerWorkedWithHelper(helperId:number):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:3}})
  }

  public async getBlockedCustomer(helperId:number, customerId:number):Promise<FavoriteAndBlocked | null>{
    return db.FavoriteAndBlocked.findOne({where:{UserId:helperId, TargetUserId:customerId}});
  }

  public async updateBlockedCustomer(helperId:number, customerId:number):Promise<[number,FavoriteAndBlocked[]]>{
    return db.FavoriteAndBlocked.update({IsBlocked:true},{where:{UserId:helperId, TargetUserId:customerId}});
  }

  public async updateUnBlockedCustomer(helperId:number, customerId:number):Promise<[number,FavoriteAndBlocked[]]>{
    return db.FavoriteAndBlocked.update({IsBlocked:false},{where:{UserId:helperId, TargetUserId:customerId}});
  }

  public async createBlockUnblockCustomer(blockCustomer:{[key: number|string]:FavoriteAndBlocked}):Promise<FavoriteAndBlocked>{
    return db.FavoriteAndBlocked.create(blockCustomer);
  }

  
}