import { User } from "../../models/user";
import { ServiceRequestRepository } from "./NewServiceRequest.repository";
import { ServiceRequest } from "../../models/servicerequest";

export class ServiceRequestService {
  public constructor(private readonly serviceRequestRepository: ServiceRequestRepository) {
    this.serviceRequestRepository = serviceRequestRepository;
  }

  public async getHelperDetailbyId(helperId: string): Promise<User | null> {
    return this.serviceRequestRepository.getHelperDetailById(parseInt(helperId));
  }

  public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
    return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
  }

  public async getAllServiceRequestsOfHelper(helperId: string): Promise<ServiceRequest[] | null> {
    return this.serviceRequestRepository.getAllServiceRequestsOfHelper(parseInt(helperId));
  }

  public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
    return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
  }

  public async acceptNewServiceRequest(serviceId:string, helperId:string): Promise<[number, ServiceRequest[]]>
  {
    return this.serviceRequestRepository.acceptNewServiceRequest(parseInt(serviceId), parseInt(helperId));
  };

  public async getAllPendingServiceRequestByZipcode(zipCode: string, helperId:string): Promise<ServiceRequest[] | null> {
    let sRequest:ServiceRequest[] = [];
    const serviceRequest = await this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);

    const blockedCustomer = await this.serviceRequestRepository.getBlockedCustomerOfhelper(parseInt(helperId));

    if(serviceRequest){
      if(blockedCustomer){
        sRequest = serviceRequest.filter(sr => 
          !blockedCustomer.find(rm => 
              (rm.TargetUserId === sr.UserId)
            ));
      }
    }
    return sRequest;


  }
  

  public async filterServiceRequestsCompatibleWithHelper(includePets: boolean,serviceRequests: ServiceRequest[]) {
    let sRequests: ServiceRequest[] = [];
    if (includePets === false) {
      for (let sr in serviceRequests) {
        if (serviceRequests[sr].HasPets === false) {
          sRequests.push(serviceRequests[sr]);
        }
      }
    } else {
      return serviceRequests;
    }
    return sRequests;
  }

  public async displayRequestDetail(srequest:ServiceRequest[]):Promise<Object[]>{
    let requestDetail:Object[] = [];
    for(let sr in srequest){
      const user = await this.serviceRequestRepository.getUserDetailById(srequest[sr].UserId);
      const requestAddress = await this.serviceRequestRepository.getRequestAddress(srequest[sr].ServiceRequestId);

      const startTimeArray =
        srequest[sr].ServiceStartTime.toString().split(":")!;

      const endTimeInt = (
        parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
        srequest[sr].ServiceHours! + srequest[sr].ExtraHours!
      ).toString().split(".");

      if (endTimeInt[1]) {
        endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
      } else {
        endTimeInt[1] = "00";
      }

      if(user){
        if(requestAddress){
          requestDetail.push({
            ServiceId:srequest[sr].ServiceRequestId,
            ServiceDate:srequest[sr].ServiceStartDate.toString().split("-").reverse().join("-"),
            Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1],
            Customer: user.FirstName + " " + user.LastName,
            Address: {
              Street: requestAddress.AddressLine1,
              HouseNumber: requestAddress.AddressLine2,
              City: requestAddress.City,
              PostalCode: requestAddress.PostalCode,
            },
            Payment:srequest[sr].TotalCost+" €"

          })
        }
      }
    }
    return requestDetail;
  }



  public FutureSameDateAndTime(date: Date,serviceRequest: ServiceRequest[],acceptTotalHour: number,time: number) {
    let srId;
    let matched = false;
    for (let sr in serviceRequest) {
      if (serviceRequest[sr].ServiceStartDate === date) {
        const acceptTime = time.toString().split(":");
        if (acceptTime[1] === "30") {
          acceptTime[1] = "0.5";
        }
        const acceptStartTime =
          parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);

        const availableTime =
          serviceRequest[sr].ServiceStartTime.toString().split(":");
        if (availableTime[1] === "30") {
          availableTime[1] = "0.5";
        }
        const availableStartTime =
          parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
        const availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
        const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
        const totalAvailableTime = availableStartTime + availableTotalHour + 1;
        if (
          availableStartTime >= totalAcceptTime ||
          acceptStartTime >= totalAvailableTime
        ) {
          matched = false;
        } else {
          srId = serviceRequest[sr].ServiceRequestId;
          matched = true;
          break;
        }
      } else {
        matched = false;
      }
    }
    return {matched, srId};
  }

  public createData(userEmail:string, srId:string): typeof data{
    const data = {
        from: 'akashamitthakkar@gmail.com',
        to: userEmail,
        subject: 'About assigned service request',
        html: `
            <h2>A service request ${srId} has already been accepted by someone else</h2>
            `
    }
    return data;
  }
}