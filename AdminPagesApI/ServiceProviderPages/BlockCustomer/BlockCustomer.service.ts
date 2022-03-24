import { User } from "../../models/user";
import { BlockCustomerRepository } from "./BlockCustomer.repository";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest} from "../../models/servicerequest";
type Customer = {
  UserId: number,
  Name: string,
  Email: string,
  ZipCode: string | undefined
}

export class BlockCustomerService {
  public constructor(
    private readonly blockCustomerRepository: BlockCustomerRepository
  ) {
    this.blockCustomerRepository = blockCustomerRepository;
  }

  public async findUser(Email: string): Promise<User | null> {
    return this.blockCustomerRepository.findUser(Email);
}


public async findServiceBySpId(ServiceProviderId: number): Promise<ServiceRequest[]> {
    return this.blockCustomerRepository.findServiceBySpId(ServiceProviderId);
}

public findAllcustIdSpHadWorkedFor(service: ServiceRequest[]) {
    const custId: number[] = [];
    for(let s in service) {
        if(service[s].Status === 2 && service[s].UserId!= null) {
            custId.push(service[s].UserId!);
        }
    }
    return custId;
}

public async findAllcustSpHadWorkedFor(ServiceProviderId: number): Promise<Customer[] | void> {
    let cust: Customer[] = [];
    const service = await this.blockCustomerRepository.findAllcustSpHadWorkedFor(ServiceProviderId);
    if(service) {
        if(service.length > 0) {
            for(let s in service) {
                const user = await this.blockCustomerRepository.findByUId(service[s].UserId!);
                if(user) {
                    cust.push({
                        UserId: user.UserId,
                        Name: user.FirstName + " " + user.LastName,
                        Email: user.Email,
                        ZipCode: user.ZipCode
                    })
                }
            }
        }
    }
    const userId = cust.map(o => o.UserId)
    const users = cust.filter(({ UserId }, index) => !userId.includes(UserId, index+1))
    return users;
};

public async findBlockedCust(UserId: number, custId: number): Promise<FavoriteAndBlocked | null> {
    return this.blockCustomerRepository.findBlockedCust(UserId, custId);
}

public async updateBlockedCust(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.blockCustomerRepository.updateBlockedCust(blocked);
}

public async createBlockedCust(favorite: {[key: number | string]: FavoriteAndBlocked}): Promise<FavoriteAndBlocked | null> {
    return this.blockCustomerRepository.createBlockedCust(favorite);
}




}