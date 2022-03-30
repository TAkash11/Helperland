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
    findUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.findUserByEmail(Email);
        });
    }
    changePassword(Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.changePassword(Email, Password);
        });
    }
    updateSPDetails(Email, FirstName, LastName, Mobile, DateOfBirth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.updateSPDetails(Email, FirstName, LastName, Mobile, DateOfBirth);
        });
    }
    findByUserId(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.findByUserId(UserId);
        });
    }
    createUserAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.createUserAddress(address);
        });
    }
    updateUserAddress(UserId, AddressLine1, AddressLine2, City, PostalCode, Mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mySettingsRepository.updateUserAddress(UserId, AddressLine1, AddressLine2, City, PostalCode, Mobile);
        });
    }
}
exports.MySettingsService = MySettingsService;
