import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { MySettingsRepository } from "./MySettings.repository";


export class MySettingsService {
  public constructor(private readonly mySettingsRepository: MySettingsRepository) 
  {
    this.mySettingsRepository = mySettingsRepository;
  };

  public async getUserDetailById(userId:number):Promise<Object|null>{
    let displayDetail:Object = {}
    const detail = await this.mySettingsRepository.getUserDetailById(userId);
    const address = await this.mySettingsRepository.getUserAddressById(userId);
    if(detail){
      displayDetail = {
        Status:detail.Status,
        BasicDetails:{
          FirstName:detail.FirstName,
          LastName:detail.LastName,
          EmailAddress:detail.Email,
          PhoneNumber: detail.Mobile,
          DateOfBirth:detail.DateOfBirth,
          Nationality:detail.NationalityId,
          Gender:detail.Gender,
          ProfilePicture:detail.UserProfilePicture,
        },
        Address: {
          StreetName: address?.Addressline1,
          HouseNumber: address?.Addressline2,
          PostalCode: address?.PostalCode,
          City: address?.City
        }
        
      }
    }
    return displayDetail
  }

  public async updateUserDetailbyId(userId:string, user:updateUserDetail):Promise<[number,User[]]>{
    if(user.Gender === "Male"){
      user.GenderId = 1;
    }else if(user.Gender === "Female"){
      user.GenderId = 2;
    }else{
      user.GenderId = 3;
    }
    return this.mySettingsRepository.updateUserDetailById(parseInt(userId), user);
  }

  public async getHelperAddressById(helperId:number):Promise<UserAddress| null>{
    return this.mySettingsRepository.getHelperAddressById(helperId);
  }

  public async updateUserAddress(addressId:number, user:updateUserDetail){
    return this.mySettingsRepository.updateUserAddress(addressId, user);
  }

  public async createAddress(addressId:number, user:updateUserDetail){
    return this.mySettingsRepository.createAddress(addressId, user);
  }

  public async getUserById(userId:string):Promise<User | null>{
    return this.mySettingsRepository.getUserById(parseInt(userId));
  }

  public async changePassword(userId:string, password:string):Promise<[number,User[]]>{
    return this.mySettingsRepository.changePassword(parseInt(userId), password);
  }

  // //local services

  public convertStringToDate(dateStr:any){
    const dateString = dateStr.toString().split('-').reverse().join('-');
    const date = new Date(dateString);

    return date;

  }
  
}