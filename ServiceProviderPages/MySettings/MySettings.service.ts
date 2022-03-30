import { UserAddress } from "../../models/useraddress";
import { User } from "../../models/user";
import { MySettingsRepository } from "./MySettings.repository";

export class MySettingsService {
  public constructor(private readonly mySettingsRepository: MySettingsRepository) 
  {
    this.mySettingsRepository = mySettingsRepository;
  };

  public async findUserByEmail(Email: string): Promise<User | null> {
    return this.mySettingsRepository.findUserByEmail(Email);
}

public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
    return this.mySettingsRepository.changePassword(Email, Password);
}

public async updateSPDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date): Promise<[number, User[]]> {
    return this.mySettingsRepository.updateSPDetails(Email, FirstName, LastName, Mobile, DateOfBirth);
}

public async findByUserId(UserId: number): Promise<UserAddress | null> {
    return this.mySettingsRepository.findByUserId(UserId);
}

public async createUserAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
    return this.mySettingsRepository.createUserAddress(address);
}

public async updateUserAddress(UserId: number, AddressLine1: string, AddressLine2: string, City: string, PostalCode: number, Mobile: number): Promise<[number, UserAddress[]]> {
    return this.mySettingsRepository.updateUserAddress(UserId, AddressLine1, AddressLine2, City, PostalCode, Mobile);
}
}