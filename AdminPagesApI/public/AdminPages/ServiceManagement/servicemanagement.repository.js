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
exports.ServiceManagementRepository = void 0;
const index_1 = require("../../models/index");
class ServiceManagementRepository {
    findAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll();
        });
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    findUserById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId } });
        });
    }
    findSPById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
        });
    }
    findAddressById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    findSpRatings(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    findByServiceId(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceId: ServiceId } });
        });
    }
    findBySId(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    updateServiceStatus(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 3 }, { where: { ServiceId: ServiceId } });
        });
    }
    updateStatus(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 1 }, { where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    updateAddress(ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, PostalCode: PostalCode, City: City }, { where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    findByAllSPId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
        });
    }
    updateService(ServiceRequestId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ ServiceStartDate: ServiceStartDate, ServiceStartTime: ServiceStartTime }, { where: { ServiceRequestId: ServiceRequestId } });
        });
    }
}
exports.ServiceManagementRepository = ServiceManagementRepository;
