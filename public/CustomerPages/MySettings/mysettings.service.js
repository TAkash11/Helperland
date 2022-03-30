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
exports.SettingsService = void 0;
class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
        this.settingsRepository = settingsRepository;
    }
    updateUserDetails(Email, FirstName, LastName, Mobile, DateOfBirth) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.settingsRepository.updateUserDetails(Email, FirstName, LastName, Mobile, DateOfBirth);
        });
    }
    findUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.settingsRepository.findUserByEmail(Email);
        });
    }
    updateUserAddress(Id, AddressLine1, AddressLine2, City, State, PostalCode, Mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.settingsRepository.updateUserAddress(Id, AddressLine1, AddressLine2, City, State, PostalCode, Mobile);
        });
    }
    findByAddressId(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.settingsRepository.findByAddressId(Id);
        });
    }
    deleteAddress(Id) {
        return this.settingsRepository.deleteAddress(Id);
    }
    changePassword(Email, Password) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.settingsRepository.changePassword(Email, Password);
        });
    }
}
exports.SettingsService = SettingsService;
