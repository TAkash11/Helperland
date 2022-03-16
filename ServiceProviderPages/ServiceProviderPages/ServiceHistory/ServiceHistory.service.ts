import { User } from "../../models/user";
import { ServiceHistoryRepository } from "./ServiceHistory.repository";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";
import moment from "moment";

type Customer = {
  UserId:number,
  Name:string
}

export class ServiceHistoryService {
  public constructor(private readonly serviceHistoryRepository: ServiceHistoryRepository) {
    this.serviceHistoryRepository = serviceHistoryRepository;
  }

  public async getServiceRequestHistoryOfHelper(userId: number): Promise<ServiceRequest[] | null> {
    return this.serviceHistoryRepository.getServiceRequestHistoryOfHelper(
      userId
    );
  }

  public async getServiceRequestDetailById(srId: number): Promise<ServiceRequest | null> {
    return this.serviceHistoryRepository.getServiceRequestDetailById(srId);
  }

  public async getUserDetailById(userId: number): Promise<User | null> {
    return this.serviceHistoryRepository.getUserDetailById(userId);
  }

  public async getRatingsOfHelper(helperId: string): Promise<Rating[] | null> {
    return this.serviceHistoryRepository.getRatingsOfHelper(parseInt(helperId));
  }

  //local service

  public compareDateWithCurrentDate(requestHistory: ServiceRequest[]) {
    const srHistory: ServiceRequest[] = [];
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));

    for (let sr in requestHistory) {
      const date = requestHistory[sr].ServiceStartDate;
      const formatedDate1 = new Date(moment(date).format("YYYY-MM-DD"));

      if (formatedDate1 <= formatedDate2) {
        srHistory.push(requestHistory[sr]);
      }
    }
    return srHistory;
  }

  public async getDatForExport(serviceRequest: ServiceRequest[]): Promise<Object[]>{
    let exportHistory: Object[] = [];

    for (let history in serviceRequest) {
      let user = await this.serviceHistoryRepository.getUserDetailById(
        serviceRequest[history].UserId
      );
      exportHistory.push({
        ServiceId: serviceRequest[history].ServiceRequestId,
        StartDate: serviceRequest[history].ServiceStartDate,
        Customer: user?.FirstName! + " " + user?.LastName!,
        Payment: serviceRequest[history].TotalCost,
      });
    }
    return exportHistory;
  }

  public async gethistoryForDisplay(serviceRequest: ServiceRequest[]) {
    let historyData: Object[] = [];
    for (let sr in serviceRequest) {
      let user = await this.serviceHistoryRepository.getUserDetailById(
        serviceRequest[sr].UserId
      );
      let address = await this.serviceHistoryRepository.getServiceAddress(
        serviceRequest[sr].ServiceRequestId
      );

      const startTimeArray =
        serviceRequest[sr].ServiceStartTime.toString().split(":")!;
      const endTimeInt = (
        parseFloat(startTimeArray[0]) +
        parseFloat(startTimeArray[1]) / 60 +
        serviceRequest[sr].ServiceHours! +
        serviceRequest[sr].ExtraHours!
      )
        .toString()
        .split(".");
      if (endTimeInt[1]) {
        endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
      } else {
        endTimeInt[1] = "00";
      }

      if (user) {
        if (address) {
          historyData.push({
            ServiceId: serviceRequest[sr].ServiceRequestId,
            StartDate: serviceRequest[sr].ServiceStartDate.toString().split("-").reverse()
              .join("-"),
            Customer: user.FirstName + " " + user.LastName,
            Address: {
              Street: address.Addressline1,
              HouseNumber: address.Addressline2,
              City: address.City,
              PostalCode: address.PostalCode,
            },
            Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1]
          });
        }
      }
    }
    return historyData;
  }

  public async getRatingsForDisplay(ratings: Rating[]): Promise<Object[]> {
    let displayData: Object[] = [];
    for (let rate in ratings) {

      let serviceRequest =await this.serviceHistoryRepository.getServiceRequestDetailById(
          ratings[rate].ServiceRequestId)!;

      const startTimeArray =serviceRequest?.ServiceStartTime.toString().split(":")!;
      const endTimeInt = (
        parseFloat(startTimeArray[0]) +
        parseFloat(startTimeArray[1]) / 60 +
        serviceRequest?.ServiceHours! +
        serviceRequest?.ExtraHours!).toString().split(".");

      if (endTimeInt[1]) {
        endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
      } else {
        endTimeInt[1] = "00";
      }

      let user = await this.serviceHistoryRepository
        .getUserDetailById(ratings[rate].RatingFrom)!
        .then((user) => {
          if(serviceRequest){
            if(user){
              displayData.push({
                ServiceId: ratings[rate].ServiceRequestId,
                StartDate:serviceRequest.ServiceStartDate.toString().split("-").reverse().join("-"),
                Customer: user.FirstName + " " + user.LastName,
                CustomerComment: ratings[rate].Comments,
                Ratings: ratings[rate].Ratings,
                Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":" +endTimeInt[1]
              });
            }
          }
        });
    }
    return displayData;
  }
}