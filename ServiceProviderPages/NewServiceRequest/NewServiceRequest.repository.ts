import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";


export class ServiceRequestRepository {
  
  public async findUser(Email: string): Promise<User | null> {
    return db.User.findOne({where: { Email: Email}});
  }

  public async getHelperDetailById(helperId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:helperId, UserTypeId:2}});
  }

  public async getUserDetailById(UserId:number): Promise<User | null>{
    return db.User.findOne({where:{UserId:UserId, UserTypeId:1}});
  }

  public async getRequestAddress(requestId:number): Promise<ServiceRequestAddress | null>{
    return db.ServiceRequestAddress.findOne({where:{ServiceRequestId:requestId}});
  }

  public async getServiceRequestDetailById(requestId:number): Promise<ServiceRequest | null>{
    return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:1 }});
  }

  public async getServiceById(ServiceId: number, ZipCode: string | undefined): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 1 } });
  }

  public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
    return db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
  } 

  public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
    return db.ServiceRequestExtra.findAll({ where: { ServiceRequestId: ServiceRequestId } });
  }

  public async getAllServiceRequestsOfHelper(helperId:number):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:4}});
  }

  public async getAllPendingServiceRequestByZipcode(zipCode:string):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ZipCode:zipCode, Status:1}});
  }

  public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
    return db.User.findAll({where:{ZipCode:zipCode, UserTypeId:2}})
  }

  public async getBlockedCustomerOfhelper(helperId:number):Promise<FavoriteAndBlocked[]|null>{
    return db.FavoriteAndBlocked.findAll({where:{UserId:helperId, IsBlocked:true}});
  }

  public async acceptNewServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { 
        ServiceProviderId: helperId, 
        Status:2, 
        ModifiedBy:helperId, 
        ModifiedDate: new Date() 
      },
      { where: { ServiceId: srviceId } }
    );
  }
}