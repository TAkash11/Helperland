import { db } from "../../models/index";
import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";
import { brotliDecompress } from "zlib";


export class UpcomingServicesRepository {

  public async getAllUpcomingServicerequests(helperId:number):Promise<ServiceRequest[] | null>{
    return db.ServiceRequest.findAll({where:{ServiceProviderId:helperId, Status:2}});
  }

  public async getServiceRequestDetailById(requestId:number): Promise<ServiceRequest | null>{
    return db.ServiceRequest.findOne({where:{ServiceRequestId:requestId,Status:2 }});
  }

  public async cancelServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { Status:4, ModifiedBy:helperId },
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async completeServiceRequest(srviceId: number, helperId:number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { Status:3, ModifiedBy:helperId},
      { where: { ServiceRequestId: srviceId } }
    );
  }

  public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({
      where: { ServiceRequestId: srId },
      include: ["ServiceRequestAddress", "ExtraService"],
    });
  }
}