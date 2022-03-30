import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

export class BlockCustomerRepository {

  public async findUser(Email: string): Promise<User | null> {
    return db.User.findOne({where: { Email: Email}});
}

public async getAllRatings(RatingTo: number): Promise<Rating[]> {
    return db.Rating.findAll({ where: { RatingTo: RatingTo }});
}

public async findServiceBySpId(ServiceProviderId: number): Promise<ServiceRequest[]> {
    return db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
}

public async findAllcustSpHadWorkedFor(ServiceProviderId: number): Promise<ServiceRequest[]> {
    return db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId, Status: 2 } });
}

public async findBlockedCust(UserId: number, custId: number): Promise<FavoriteAndBlocked | null> {
    return db.FavoriteAndBlocked.findOne({ where: { UserId: UserId, TargetUserId: custId } });
}

public async updateBlockedCust(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update({ IsBlocked: blocked.IsBlocked }, { where: { UserId: blocked.UserId, TargetUserId: blocked.TargetUserId } });
}

public async createBlockedCust(favorite: {[key: number | string]: FavoriteAndBlocked}): Promise<FavoriteAndBlocked | null> {
    return db.FavoriteAndBlocked.create(favorite);
}

public async findService(ServiceRequestId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
}

public async findByUId(UserId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: UserId } });
}
}