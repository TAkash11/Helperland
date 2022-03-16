import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { Op } from "sequelize";
import { User } from "../../models/user";

export class HistoryRepository {

  public async findUser(Email: string): Promise<User | null> {
    return db.User.findOne({where: { Email: Email}});
  }

  public async getServiceRequestHistoryOfUser(UserId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({
      where: { UserId: UserId ,  Status: {
        [Op.or]: [3, 4]
      }},
    });
  } 
  
  public async getServiceById(SId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceId: SId, Status: {
        [Op.or]: [3, 4] }},
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async getServiceByRequestId(SId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: SId, Status: {
        [Op.or]: [2] }},
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async giveRatings(ratings:{[key: number|string]:Rating}): Promise<Rating>{
    return db.Rating.create(ratings);
  }

  public async getRatingsById(serviceRequestId:number): Promise<Rating | null>{
    return db.Rating.findOne({where:{ServiceRequestId:serviceRequestId}});
  }
}