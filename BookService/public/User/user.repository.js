"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const index_1 = require("../models/index");
class UserRepository {
    CustomerSignup(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const { FirstName, LastName, Email, Password, Mobile, DateOfBirth } = User;
            return index_1.db.User.create({
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Password: Password,
                Mobile: Mobile,
                UserTypeId: 1,
                DateOfBirth: DateOfBirth,
                IsRegisteredUser: false,
                IsApprovedUser: true
            });
        });
    }
    HelperSignup(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const { FirstName, LastName, Email, Password, Mobile, DateOfBirth } = User;
            return index_1.db.User.create({
                FirstName: FirstName,
                LastName: LastName,
                Email: Email,
                Password: Password,
                Mobile: Mobile,
                UserTypeId: 2,
                DateOfBirth: DateOfBirth,
                IsRegisteredUser: false,
                IsApprovedUser: true
            });
        });
    }
    getUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    updateUser(userIsRegistered, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ IsRegisteredUser: userIsRegistered }, { where: { Email: userEmail } });
        });
    }
}
exports.UserRepository = UserRepository;
