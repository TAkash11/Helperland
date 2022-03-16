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
exports.MySettingsService = void 0;
class MySettingsService {
    constructor(mySettingsRepository) {
        this.mySettingsRepository = mySettingsRepository;
        this.mySettingsRepository = mySettingsRepository;
    }
    ;
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let displayDetail = {};
            const detail = yield this.mySettingsRepository.getUserDetailById(userId);
            const address = yield this.mySettingsRepository.getUserAddressById(userId);
            if (detail) {
                displayDetail = {
                    BasicDetails: {
                        FirstName: detail.FirstName,
                        LastName: detail.LastName,
                        EmailAddress: detail.Email,
                        PhoneNumber: detail.Mobile,
                        DateOfBirth: detail.DateOfBirth,
                    },
                    Address: {
                        StreetName: address === null || address === void 0 ? void 0 : address.AddressLine1,
                        HouseNumber: address === null || address === void 0 ? void 0 : address.AddressLine2,
                        PostalCode: address === null || address === void 0 ? void 0 : address.PostalCode,
                        City: address === null || address === void 0 ? void 0 : address.City
                    }
                };
            }
            return displayDetail;
        });
    }
    updateUserDetailbyId(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.updateUserDetailById(parseInt(userId), user);
        });
    }
    getHelperAddressById(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.getHelperAddressById(helperId);
        });
    }
    updateUserAddress(addressId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.updateUserAddress(addressId, user);
        });
    }
    createAddress(addressId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.createAddress(addressId, user);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.getUserById(parseInt(userId));
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.changePassword(parseInt(userId), password);
        });
    }
    // //local services
    convertStringToDate(dateStr) {
        const dateString = dateStr.toString().split('-').reverse().join('-');
        const date = new Date(dateString);
        return date;
    }
}
exports.MySettingsService = MySettingsService;
