import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { Op } from "sequelize";

export class HistoryRepository {

  public async getServiceRequestHistoryOfUser(userId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({
      where: { UserId: userId ,  Status: {
        [Op.or]: [3, 4]
      }},
    });
  }

  public async getServiceById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }

  public async setRatings(ratings:{[key: number|string]:Rating}): Promise<Rating>{
    return db.Rating.create(ratings);
  }

  public async getRatingsByServiceRequestId(serviceRequestId:number): Promise<Rating | null>{
    return db.Rating.findOne({where:{ServiceRequestId:serviceRequestId}});
  }
}