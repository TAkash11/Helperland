import { db } from "../../models/index";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class ServiceManagementRepository {

    public async findAllService(): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll();
    }

    public async findUser(Email: string): Promise<User | null> {
        return db.User.findOne({where: { Email: Email}});
    }

    public async findUserById(UserId: number): Promise<User | null> {
        return db.User.findOne({ where: { UserId: UserId} });
    }

    public async findSPById(UserId: number | undefined): Promise<User | null> {
        return db.User.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findSpRatings(ServiceRequestId: number): Promise<Rating | null> {
        return db.Rating.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findByServiceId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findBySId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async updateServiceStatus(ServiceRequestId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ Status: 3 }, {where: { ServiceRequestId: ServiceRequestId }});
    }

    public async updateStatus(ServiceRequestId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ Status: 1 }, {where: { ServiceRequestId: ServiceRequestId }});
    }

    public async updateAddress(ServiceRequestId: number, AddressLine1: string, AddressLine2: string, PostalCode: number, City: string): Promise<[number, ServiceRequestAddress[]] | [affectedCount: number]> {
        return db.ServiceRequestAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, PostalCode: PostalCode, City: City }, { where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
    }

    public async updateService(ServiceRequestId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ ServiceStartDate: ServiceStartDate, ServiceStartTime: ServiceStartTime }, { where: { ServiceRequestId: ServiceRequestId } });
    }

}