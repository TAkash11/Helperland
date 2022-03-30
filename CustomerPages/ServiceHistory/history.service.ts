import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { HistoryRepository } from "./history.repository";
import jwt from "jsonwebtoken";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";

import moment from "moment";


export class HistoryService  {
  public constructor(private readonly serviceHistoryRepository: HistoryRepository) 
  {
    this.serviceHistoryRepository = serviceHistoryRepository;
  };

  public async findUser(Email: string): Promise<User | null> {
    return this.serviceHistoryRepository.findUser(Email);
  }

  public async getServiceRequestHistoryOfUser(UserId: number): Promise<ServiceRequest[] | null> 
  {
    return this.serviceHistoryRepository.getServiceRequestHistoryOfUser(UserId);
  };

  public async getServiceById(SId: number): Promise<ServiceRequest | null> 
  {
    return this.serviceHistoryRepository.getServiceById(SId);
  };

  public async getServiceByRequestId(ServiceRequestId: number): Promise<ServiceRequest | null> {
    return this.serviceHistoryRepository.getServiceByRequestId(ServiceRequestId);
}

public async giveRatings(Rating: {[key: number | string] : Rating}): Promise<Rating> {
    return this.serviceHistoryRepository.giveRatings(Rating);
}

public async getRatingsById(ServiceRequestId: number): Promise<Rating | null> {
    return this.serviceHistoryRepository.getRatingsById(ServiceRequestId);
}




  //local service

  public compareDateWithCurrentDate(requestHistory:ServiceRequest[]) {
    const srHistory:ServiceRequest[] = [];
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
    console.log(formatedDate2);
    for(let sr in requestHistory){
      const date = requestHistory[sr].ServiceStartDate;
      const formatedDate1 = new Date(moment(date).format("YYYY-MM-DD"));
      console.log(formatedDate1);
      if (formatedDate1 < formatedDate2) {
        srHistory.push(requestHistory[sr]);
      }
      console.log(srHistory);
    }
    return srHistory;
     
  };

  public getRatings(body: any){
    const Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService)/3
    return Ratings;
  }
  
}