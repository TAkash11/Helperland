import { Op } from "sequelize";
import { db } from "../../models/index";
import { User } from "../../models/user";

export class UserManagementRepository {

    public async findUser(userId: number): Promise<User | null> {
        return db.User.findOne({ where: { UserId: userId } });
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.User.findOne({ where: { Email: Email } });
    }

    public async findAllUsers(): Promise<User[]> {
        return db.User.findAll({ where: { UserTypeId: { [Op.or]: [1, 2] } } });
    }

    public async activateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.User.update({ IsApprovedUser: true }, { where: { Email: Email } } );
    }

    public async deactivateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.User.update({ IsApprovedUser: false }, { where: { Email: Email } } );
    }

}