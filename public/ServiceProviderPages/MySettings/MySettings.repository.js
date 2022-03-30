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
exports.MySettingsRepository = void 0;
const index_1 = require("../../models/index");
class MySettingsRepository {
    findUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    changePassword(Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ Password: Password }, { where: { Email: Email } });
        });
    }
    updateSPDetails(Email, FirstName, LastName, Mobile, DateOfBirth) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DateOfBirth: DateOfBirth }, { where: { Email: Email } });
        });
    }
    findByUserId(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { UserId: UserId } });
        });
    }
    createUserAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create(address);
        });
    }
    updateUserAddress(UserId, AddressLine1, AddressLine2, City, PostalCode, Mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City, PostalCode: PostalCode, Mobile: Mobile }, { where: { UserId: UserId } });
        });
    }
}
exports.MySettingsRepository = MySettingsRepository;
