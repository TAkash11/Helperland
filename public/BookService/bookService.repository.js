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
exports.BookServiceRepository = void 0;
const index_1 = require("../models/index");
class BookServiceRepository {
    getHelpers() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: 2 } });
        });
    }
    getUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getAddresses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findAll({ where: { UserId: userId } });
        });
    }
    getHelpersByZipcode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { UserTypeId: 2, ZipCode: zipCode } });
        });
    }
    createUserAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create(userAddress);
        });
    }
    createService(ServiceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.create(ServiceRequest, { include: ['ServiceRequestAddress', 'ExtraService'] });
        });
    }
}
exports.BookServiceRepository = BookServiceRepository;
