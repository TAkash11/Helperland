import { UpcomingServicesRepository } from "./UpcomingServiceRequest.repository";
import { ServiceRequest } from "../../models/servicerequest";
import moment from "moment";

export class UpcomingService {
  public constructor(private readonly upcomingServicesRepository: UpcomingServicesRepository) {
    this.upcomingServicesRepository = upcomingServicesRepository;
  }

  public async getAllUpcomingServicerequests(helperId:string):Promise<ServiceRequest[] | null>{
    return this.upcomingServicesRepository.getAllUpcomingServicerequests(parseInt(helperId))
    .then(serviceRequests => {
      const sRequest:ServiceRequest[] = [];
      const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
      if(serviceRequests){
        for(let sr in serviceRequests){
          let serviceRequestDate = new Date(serviceRequests[sr].ServiceStartDate);
          if(currentDate > serviceRequestDate ){
            continue;
          }
          sRequest.push(serviceRequests[sr]);
        }
      }
      return sRequest;
    });
  }

  public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
    return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId));
  }

  public async cancelServiceRequest(serviceId:string, helperId:string): Promise<[number, ServiceRequest[]]>
  {
    return this.upcomingServicesRepository.cancelServiceRequest(parseInt(serviceId),parseInt(helperId));
  };

  public async completeServiceRequest(serviceId:string,helperId:string): Promise<[number, ServiceRequest[]]>
  {
    return this.upcomingServicesRepository.completeServiceRequest(parseInt(serviceId),parseInt(helperId));
  };

  public async getServiceRequestDetailForCompleteRequest(requestId: string): Promise<ServiceRequest | null> {
    return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId))
  }

  public async getServiceDetailById(srId: number): Promise<ServiceRequest | null> 
  {
    return this.upcomingServicesRepository.getServiceDetailById(srId);
  };

  public async isRequestTimeLessThanCurrentDateAndTime(serviceRequest: ServiceRequest): Promise<ServiceRequest | null> {
    const sRequestDate = new Date(serviceRequest!?.ServiceStartDate);
    const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));

    var time = serviceRequest.ServiceStartTime.toString().split(":");
    const requestTime = parseFloat(time[0]) + parseFloat(time[1]) / 60;
    const requestTotalTime =
      requestTime + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
    const currentTotalTime =new Date().getHours() + new Date().getMinutes() / 60;

    if (sRequestDate < currentDate) {
      return serviceRequest;
    } 
    else if (sRequestDate > currentDate) {
      return null;
    } 
    else {
      if (requestTotalTime < currentTotalTime) 
      {
        return serviceRequest;
      } 
      else 
      {
        return null;
      }
    }
  }
}