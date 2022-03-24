import { UserManagementRepository } from "./usermanagement.repository";
import { User } from "../../models/user";

export class UserManagementService {
    public constructor(private readonly userRepository: UserManagementRepository) {
        this.userRepository = userRepository;
    }

    public async findUser(userId: number): Promise<User | null> {
        return this.userRepository.findUser(userId);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.userRepository.findUserByEmail(Email);
    }

    public async findAllUsers(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }

    public async activateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.userRepository.activateUser(Email);
    }

    public async deactivateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.userRepository.deactivateUser(Email);
    }
}