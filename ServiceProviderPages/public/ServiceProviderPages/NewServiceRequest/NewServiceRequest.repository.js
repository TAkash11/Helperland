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
    getHelperDetailById(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: helperId, UserTypeId: 3 } });
        });
    }
    getUserDetailById(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: helperId, UserTypeId: 4 } });
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
    getAllServiceRequestsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: helperId, Status: 2 } });
        });
    }
    getAllPendingServiceRequestByZipcode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ZipCode: zipCode, Status: 1 } });
        });
    }
    getHelpersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll({ where: { ZipCode: zipCode, UserTypeId: 3 } });
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
                SPAcceptedDate: new Date()
            }, { where: { ServiceRequestId: srviceId } });
        });
    }
}
exports.ServiceRequestRepository = ServiceRequestRepository;
