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
exports.SettingsRepository = void 0;
const index_1 = require("../../models/index");
class SettingsRepository {
    updateUserDetails(Email, FirstName, LastName, Mobile, DateOfBirth) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DateOfBirth: DateOfBirth }, { where: { Email: Email } });
        });
    }
    findUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    updateUserAddress(Id, AddressLine1, AddressLine2, City, State, PostalCode, Mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City, State: State, PostalCode: PostalCode, Mobile: Mobile }, { where: { Id: Id } });
        });
    }
    findByAddressId(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { Id: Id } });
        });
    }
    deleteAddress(Id) {
        return index_1.db.ServiceRequestAddress.destroy({ where: { Id: Id } });
    }
    changePassword(Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ Password: Password }, { where: { Email: Email } });
        });
    }
}
exports.SettingsRepository = SettingsRepository;
