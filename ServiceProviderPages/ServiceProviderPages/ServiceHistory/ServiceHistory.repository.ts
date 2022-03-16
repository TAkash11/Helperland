import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class ServiceHistoryRepository {

  public async getServiceRequestHistoryOfHelper(helperId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({
      where: { ServiceProviderId: helperId ,  Status:3}, 
      include:["ServiceRequestAddress", "UserRequest"]
    });
  }

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async getUserDetailById(userId: number): Promise<User | null> 
  {
    return db.User.findOne({where:{UserId:userId}});
  };

  public async getRatingsOfHelper(helperId:number):Promise<Rating[]|null>{
    return db.Rating.findAll({where:{RatingTo:helperId},include:["RatingServiceRequest"]});
  }

  public async getServiceAddress(requestId: number): Promise<ServiceRequestAddress | null> 
  {
    return db.ServiceRequestAddress.findOne({where:{ServiceRequestId:requestId}});
  };

  public async getCustomerWorkedWithHelper(helperId:number):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:3}})
  }
}