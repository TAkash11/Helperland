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
exports.UpcomingServicesRepository = void 0;
const index_1 = require("../../models/index");
class UpcomingServicesRepository {
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getAllUpcomingRequest(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: UserId, Status: 2 }, include: ['ServiceRequestAddress'] });
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 2 }, include: ['ServiceRequestAddress', 'ExtraService'] });
        });
    }
    updateServiceStatus(ServiceId, ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 1, ServiceProviderId: ServiceProviderId }, { where: { ServiceId: ServiceId } });
        });
    }
    findCustById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
        });
    }
    completeService(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 4 }, { where: { ServiceId: ServiceId } });
        });
    }
    findUserById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
        });
    }
    findAddressById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    findExtraById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestExtra.findAll({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
}
exports.UpcomingServicesRepository = UpcomingServicesRepository;
