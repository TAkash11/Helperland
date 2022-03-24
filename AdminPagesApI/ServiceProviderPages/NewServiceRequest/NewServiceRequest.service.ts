import { User } from "../../models/user";
import { ServiceRequestRepository } from "./NewServiceRequest.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class ServiceRequestService {
  public constructor(private readonly serviceRequestRepository: ServiceRequestRepository) {
    this.serviceRequestRepository = serviceRequestRepository;
  }
  public async findUser(Email: string): Promise<User | null> {
    return this.serviceRequestRepository.findUser(Email);
  }
  public async getHelperDetailbyId(helperId: number): Promise<User | null> {
    return this.serviceRequestRepository.getHelperDetailById(helperId);
  }

  public async getUserDetailbyId(userId: number): Promise<User | null> {
    return this.serviceRequestRepository.getUserDetailById(userId);
  }

  public async getServiceRequestDetailById(requestId: string): Promise<ServiceRequest | null> {
    return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
  }

  public async getServiceById(ServiceId: number, ZipCode: string | undefined): Promise<ServiceRequest | null> {
    return this.serviceRequestRepository.getServiceById(ServiceId, ZipCode);
}

  public async getAllServiceRequestsOfHelper(helperId: number): Promise<ServiceRequest[] | null> {
    return this.serviceRequestRepository.getAllServiceRequestsOfHelper(helperId);
  }

  public async getHelpersByZipCode(zipCode:string):Promise<User[]|null>{
    return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
  }

  public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
    return this.serviceRequestRepository.findAddressById(ServiceRequestId);
  }

  public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
      return this.serviceRequestRepository.findExtraById(ServiceRequestId);
  }

  public async acceptNewServiceRequest(serviceId:number, helperId:number): Promise<[number, ServiceRequest[]]>
  {
    return this.serviceRequestRepository.acceptNewServiceRequest(serviceId, helperId);
  };

  public async getAllPendingServiceRequestByZipcode(zipCode: string, helperId:number): Promise<ServiceRequest[] | null> 
  {
    return this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);;
  }
  public getEmail(User: User[], body: any) {
    let Email = [];
   
    for(let u in User) {
        Email.push(User[u].Email!);
    }
    
    return Email;
}
  
  public async displayRequestDetail(service:ServiceRequest[]):Promise<Object[]>{
    let requestDetail:Object[] = [];
    for(let s in service) {
      const userdetails = await this.serviceRequestRepository.getUserDetailById(service[s].UserId!);
      const addressdetails = await this.serviceRequestRepository.getRequestAddress(service[s].ServiceRequestId);

      const Time = (service[s].ServiceHours);
      const Extra = (service[s].ExtraHours);
      const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
      const total = ((Time+Extra!).toString()).split('.');
      var time:string ;
      if(StartTime[1] == "30"){
          if(total[1] == '5'){
              time = (((+StartTime[0])+(+total[0])+1).toString())+":00";
          }
          else{
              time = (((+StartTime[0])+(+total[0])).toString())+":30";
          }
      }
      else{
          if(total[1] == '5'){
              time = (((+StartTime[0])+(+total[0])).toString())+":30";
          }
          else{
              time = (((+StartTime[0])+(+total[0])).toString())+":00";
          } 
      }
      service[s].update({EndTime:time});

      if(userdetails) {
          if(addressdetails) {
              await requestDetail.push({
                  ServiceID: service[s].ServiceId,
                  ServiceStartDate: service[s].ServiceStartDate,
                  Duration: service[s].ServiceStartTime + " - " + time,
                  CustomerDetails: {
                      Name: userdetails.FirstName + " " + userdetails.LastName,
                      Address: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                  },
                  Payment: service[s].TotalCost + " €"
              });
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

  public createData(userEmail:string, srId:number): typeof data{
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