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
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ attributes: { exclude: ['Password'] }, where: { UserId: userId, UserTypeId: 3 }, include: index_1.db.UserAddress });
        });
    }
    updateUserDetailById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({
                FirstName: user.FirstName,
                LastName: user.LastName,
                Mobile: user.Mobile,
                DateOfBirth: user.DateOfBirth,
                ModifiedBy: userId,
                ZipCode: user.Address.PostalCode
            }, { where: { UserId: userId } });
        });
    }
    getUserAddressById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { UserId: userId, IsDeleted: false } });
        });
    }
    getHelperAddressById(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.findOne({ where: { UserId: helperId } });
        });
    }
    updateUserAddress(addressId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.update({
                AddressLine1: user.Address.StreetName,
                AddressLine2: user.Address.HouseNumber,
                PostalCode: user.Address.PostalCode,
                City: user.Address.City
            }, { where: { AddressId: addressId } });
        });
    }
    createAddress(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.UserAddress.create({
                AddressLine1: user.Address.StreetName,
                AddressLine2: user.Address.HouseNumber,
                PostalCode: user.Address.PostalCode,
                City: user.Address.City,
                IsDefault: true,
                IsDeleted: false,
                UserId: userId
            });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId } });
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update({ Password: password, ModifiedBy: userId }, { where: { UserId: userId } });
        });
    }
}
exports.MySettingsRepository = MySettingsRepository;
