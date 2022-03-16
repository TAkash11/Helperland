import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { updateUserDetail } from "./updateDetails";

export class MySettingsRepository {

  public async getUserDetailById(userId:number):Promise<User | null>{
    return db.User.findOne({attributes: {exclude: ['Password']},where:{UserId:userId, UserTypeId:3}, include:db.UserAddress});
  }

  public async updateUserDetailById(userId:number, user:updateUserDetail):Promise<[number, User[]]>{
    return db.User.update({
      FirstName:user.FirstName,
      LastName:user.LastName,
      Mobile:user.Mobile,
      DateOfBirth:user.DateOfBirth,
      ModifiedBy:userId,
      ZipCode:user.Address.PostalCode
    }, {where:{UserId:userId}});
  }

  public async getUserAddressById(userId:number):Promise<UserAddress| null>{
    return db.UserAddress.findOne({where:{UserId:userId, IsDeleted:false}});
  }

  public async getHelperAddressById(helperId:number):Promise<UserAddress| null>{
    return db.UserAddress.findOne({where:{UserId:helperId}});
  }

  public async updateUserAddress(addressId:number, user:updateUserDetail){
    return db.UserAddress.update({
      AddressLine1:user.Address.StreetName,
      AddressLine2:user.Address.HouseNumber,
      PostalCode:user.Address.PostalCode,
      City:user.Address.City
    }, {where:{AddressId:addressId}})
  }

  public async createAddress(userId:number, user:updateUserDetail){
    return db.UserAddress.create({
      AddressLine1:user.Address.StreetName,
      AddressLine2:user.Address.HouseNumber,
      PostalCode:user.Address.PostalCode,
      City:user.Address.City,
      IsDefault:true,
      IsDeleted:false,
      UserId:userId
    },)
  }

  public async getUserById(userId:number):Promise<User | null>{
    return db.User.findOne({where:{UserId:userId}});
  }

  public async changePassword(userId:number, password:string):Promise<[number,User[]]>{
    return db.User.update({Password:password, ModifiedBy:userId},{where:{UserId:userId}});
  }

}