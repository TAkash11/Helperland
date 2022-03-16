import { User } from "../../models/user";
import { BlockCustomerRepository } from "./BlockCustomer.repository";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

type Customer = {
  UserId:number,
  Name:string
}

export class BlockCustomerService {
  public constructor(
    private readonly blockCustomerRepository: BlockCustomerRepository
  ) {
    this.blockCustomerRepository = blockCustomerRepository;
  }

  public async getUserDetailById(userId: number): Promise<User | null> {
    return this.blockCustomerRepository.getUserDetailById(userId);
  }

  public async getBlockedCustomer(helperId:string, customerId:string):Promise<FavoriteAndBlocked | null>{
    return this.blockCustomerRepository.getBlockedCustomer(parseInt(helperId), parseInt(customerId));
  }

  public async getCustomerWorkedWithHelper(helperId:number):Promise<Customer[]>{
    let customer:Customer[] = [];
    const serviceRequest = await this.blockCustomerRepository.getCustomerWorkedWithHelper(helperId);
    if(serviceRequest){
      if(serviceRequest.length>0){
        for(let sr in serviceRequest){
          const user = await this.blockCustomerRepository.getUserDetailById(serviceRequest[sr].UserId);
          if(user){
            customer.push({
              Name: user.FirstName!+" "+user.LastName!,
              UserId: user.UserId
            })
          }
        }
      }
    }
    const userIds =customer.map(o => o.UserId)
    const filterArray =customer.filter(({UserId}, index) => !userIds.includes(UserId,index+1)) 
    return filterArray;
  };

  public async updateBlockedCustomer(helperId:string, customerId:string):Promise<[number,FavoriteAndBlocked[]]>{
    return this.blockCustomerRepository.updateBlockedCustomer(parseInt(helperId), parseInt(customerId));
  }

  public async updateUnBlockedCustomer(helperId:string, customerId:string):Promise<[number,FavoriteAndBlocked[]]>{
    return this.blockCustomerRepository.updateUnBlockedCustomer(parseInt(helperId), parseInt(customerId));
  }

  public async createBlockUnblockCustomer(blockCustomer:{[key: number|string]:FavoriteAndBlocked}):Promise<FavoriteAndBlocked>{
    return this.blockCustomerRepository.createBlockUnblockCustomer(blockCustomer);
  }

  public async hasHelperWorkedForCustomer(helperId:string, customerId:string):Promise<boolean>{
    let matched  = false;
    const customerIntId = parseInt(customerId);
    let customers = await this.getCustomerWorkedWithHelper(parseInt(helperId));
    if(customers){
      for(let cs in customers){
        if(customers[cs].UserId === customerIntId){
          matched =  true;
          break;
        }else{
          matched = false;
        }
      }
    }else{
      matched =  false;
    }
    return matched;
  }

}