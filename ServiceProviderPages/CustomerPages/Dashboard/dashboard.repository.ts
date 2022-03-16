import { db } from "../../models/index";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class DashboardRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.User.findOne({where: { Email: Email}});
    }

    public async getAllFutureRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: {UserId: UserId, Status: 1}, include: ['HelperRequest'] });
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, Status: 1 }, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService'] });
    }

    public async updateService(ServiceId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ ServiceStartDate: ServiceStartDate, ServiceStartTime: ServiceStartTime }, { where: { ServiceId: ServiceId } });
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ Status: 3 }, {where: { ServiceId: ServiceId }});
    }

    public async findSPById(UserId: number): Promise<User | null> {
        return db.User.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
    }

    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
    }

}