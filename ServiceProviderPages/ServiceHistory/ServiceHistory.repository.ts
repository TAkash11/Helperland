import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";


export class ServiceHistoryRepository {

  public async findUser(Email: string): Promise<User | null> {
    return db.User.findOne({where: { Email: Email}});
}

public async getAllCompletedRequest(ZipCode: string | undefined): Promise<ServiceRequest[]> {
    return db.ServiceRequest.findAll({ where: {ZipCode: ZipCode, Status: 2}, include: ['ServiceRequestAddress'] });
}

public async getServiceById(ServiceId: number, ZipCode: string | undefined): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 2 }, include: ['ServiceRequestAddress', 'ExtraService'] });
}

public async findUserById(UserId: number | undefined): Promise<User | null> {
    return db.User.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
}

public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
    return db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
}

public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
    return db.ServiceRequestExtra.findAll({ where: { ServiceRequestId: ServiceRequestId } });
}

public async findByUId(UserId: number): Promise<User | null> {
  return db.User.findOne({ where: { UserId: UserId } });
}

public async getAllRatings(RatingTo: number): Promise<Rating[]> {
  return db.Rating.findAll({ where: { RatingTo: RatingTo }});
}

public async findService(ServiceRequestId: number): Promise<ServiceRequest | null> {
  return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
}
}