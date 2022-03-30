import { User } from "../../models/user";
import { ServiceHistoryRepository } from "./ServiceHistory.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import moment from "moment";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { ServiceRequestAddress } from "../../models/servicerequestaddress"

type Customer = {
  UserId:number,
  Name:string
}

export class ServiceHistoryService {
  public constructor(private readonly serviceHistoryRepository: ServiceHistoryRepository) {
    this.serviceHistoryRepository = serviceHistoryRepository;
  }

  public async findUser(Email: string): Promise<User | null> {
    return this.serviceHistoryRepository.findUser(Email);
 }

public async getAllCompletedRequest(ZipCode: string | undefined): Promise<ServiceRequest[]> {
    return this.serviceHistoryRepository.getAllCompletedRequest(ZipCode);
 }

public async getServiceById(ServiceId: number, ZipCode: string | undefined): Promise<ServiceRequest | null> {
    return this.serviceHistoryRepository.getServiceById(ServiceId, ZipCode);
}

public async getAllRatings(RatingTo: number): Promise<Rating[]> {
  return this.serviceHistoryRepository.getAllRatings(RatingTo);
}

public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
    let details: Object[] = [];
    for(let s in service) {
        const userdetails = await this.serviceHistoryRepository.findUserById(service[s].UserId!);
        const addressdetails = await this.serviceHistoryRepository.findAddressById(service[s].ServiceRequestId);

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
                await details.push({
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
    return details;
}

public async findUserById(UserId: number | undefined): Promise<User | null> {
    return this.serviceHistoryRepository.findUserById(UserId);
}

public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
    return this.serviceHistoryRepository.findAddressById(ServiceRequestId);
}

public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
    return this.serviceHistoryRepository.findExtraById(ServiceRequestId);
}

public compareDate(history: ServiceRequest[]) {
    const sphistory: ServiceRequest[] = [];
    const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));

    for (let h in history) {
      const date = history[h].ServiceStartDate;
      const ServiceStartDate = new Date(moment(date).format("YYYY-MM-DD"));

      if (ServiceStartDate <= currentDate) {
        sphistory.push(history[h]);
      }
    }
    return sphistory;
}

public async Export(service: ServiceRequest[]): Promise<Object[]>{
    let exportHistory: Object[] = [];

    for (let s in service) {
      let userdetails = await this.findUserById(service[s].UserId);
      const addressdetails = await this.serviceHistoryRepository.findAddressById(service[s].ServiceRequestId);

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
      exportHistory.push({
        ServiceId: service[s].ServiceId,
        StartDate: service[s].ServiceStartDate,
        Duration: service[s].ServiceStartTime + " - " + time,
        CustomerName: userdetails?.FirstName + " " + userdetails?.LastName,
        Address: addressdetails?.AddressLine1 + ", " + addressdetails?.AddressLine2 + ", " + addressdetails?.City + ", " + addressdetails?.PostalCode
      });
    }
    return exportHistory;
  }

  public async Ratings(rating: Rating[]): Promise<Object[]> {
    let details: Object[] = [];
    for(let r in rating) {
        let service = await this.serviceHistoryRepository.findService(rating[r].ServiceRequestId);

        const Time = (service?.ServiceHours);
        const Extra = (service?.ExtraHours);
        const StartTime = ((service?.ServiceStartTime!).toString().split(':'));
        const total = ((Time! + Extra!).toString()).split('.');
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
        service?.update({EndTime:time});

        let userdetails = await this.serviceHistoryRepository
          .findByUId(rating[r].RatingFrom)
          .then((user) => {
              if(service) {
                  if(user) {
                      details.push({
                        ServiceID: service.ServiceId,
                        ServiceStartDate: service.ServiceStartDate,
                        Duration: service.ServiceStartTime + " - " + time,
                        Name: user.FirstName + " " + user.LastName,
                        Comments: rating[r].Comments,
                        Ratings: rating[r].Ratings
                      });
                  }
              }
          });
    }
    return details;
}

}