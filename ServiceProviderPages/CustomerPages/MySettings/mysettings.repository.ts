import { db } from "../../models/index";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class SettingsRepository {
    public async updateUserDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date ): Promise<[number, User[]]> {
        return db.User.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DateOfBirth: DateOfBirth }, { where: { Email: Email } });
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.User.findOne({where: { Email: Email}});
    }

    public async updateUserAddress(Id: number, AddressLine1: string, AddressLine2: string, City: string, State: string, PostalCode: number, Mobile: number): Promise<[number, ServiceRequestAddress[]]> {
        return db.ServiceRequestAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City, State: State, PostalCode: PostalCode, Mobile: Mobile }, { where: { Id: Id } });
    }

    public async findByAddressId(Id: number): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({ where: {Id: Id } });
    }

    public deleteAddress(Id: number): Promise<ServiceRequestAddress | number> {
        return db.ServiceRequestAddress.destroy({ where: { Id: Id } });
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return db.User.update({ Password: Password }, {where: { Email: Email }});
    }
}