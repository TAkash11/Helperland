import { User } from "../../models/user";
import { SettingsRepository } from "./mysettings.repository";
import { UserAddress } from "../../models/useraddress";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class SettingsService {
    public constructor(private readonly settingsRepository: SettingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public async updateUserDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date ): Promise<[number, User[]]> {
        return this.settingsRepository.updateUserDetails(Email, FirstName, LastName, Mobile, DateOfBirth);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.settingsRepository.findUserByEmail(Email);
    }

    public async updateUserAddress(Id: number, AddressLine1: string, AddressLine2: string, City: string, State: string, PostalCode: number, Mobile: number): Promise<[number, ServiceRequestAddress[]]> {
        return this.settingsRepository.updateUserAddress(Id, AddressLine1, AddressLine2, City, State, PostalCode, Mobile);
    }

    public async findByAddressId(Id: number): Promise<ServiceRequestAddress | null> {
        return this.settingsRepository.findByAddressId(Id);
    }

    public deleteAddress(Id: number): Promise<ServiceRequestAddress | number> {
        return this.settingsRepository.deleteAddress(Id);
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return this.settingsRepository.changePassword(Email, Password);
    }
}