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
exports.ServiceRequestRepository = void 0;
const index_1 = require("../../models/index");
class ServiceRequestRepository {
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getHelperDetailById(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: helperId, UserTypeId: 2 } });
        });
    }
    getUserDetailById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
        });
    }
    getRequestAddress(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: requestId } });
        });
    }
    getServiceRequestDetailById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: requestId, Status: 1 } });
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 1 } });
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
    getAllServiceRequestsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: helperId, Status: 4 } });
        });
    }
    getAllPendingServiceRequestByZipcode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ZipCode: zipCode, Status: 1 } });
        });
    }
    getHelpersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { ZipCode: zipCode, UserTypeId: 2 } });
        });
    }
    getBlockedCustomerOfhelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findAll({ where: { UserId: helperId, IsBlocked: true } });
        });
    }
    acceptNewServiceRequest(srviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({
                ServiceProviderId: helperId,
                Status: 2,
                ModifiedBy: helperId,
                ModifiedDate: new Date()
            }, { where: { ServiceId: srviceId } });
        });
    }
}
exports.ServiceRequestRepository = ServiceRequestRepository;
