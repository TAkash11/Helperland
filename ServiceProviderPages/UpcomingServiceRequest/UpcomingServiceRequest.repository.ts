import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { brotliDecompress } from "zlib";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";

export class UpcomingServicesRepository {

  public async findUser(Email: string): Promise<User | null> {
    return db.User.findOne({where: { Email: Email}});
}

public async getAllUpcomingRequest(UserId: number | undefined): Promise<ServiceRequest[]> {
    return db.ServiceRequest.findAll({ where: {ServiceProviderId:UserId , Status: 2}, include: ['ServiceRequestAddress'] });
}

public async getServiceById(ServiceId: number, ZipCode: string | undefined): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 2 }, include: [ 'ServiceRequestAddress', 'ExtraService'] });
}

public async updateServiceStatus(ServiceId: number, ServiceProviderId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update({ Status: 1, ServiceProviderId: ServiceProviderId}, {where: { ServiceId: ServiceId }});
}

public async findCustById(UserId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
}

public async completeService(ServiceId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update({ Status: 4}, { where: { ServiceId: ServiceId } });
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
}