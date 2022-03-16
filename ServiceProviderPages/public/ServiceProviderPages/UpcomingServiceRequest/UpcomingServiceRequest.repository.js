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
    getAllUpcomingServicerequests(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: helperId, Status: 2 } });
        });
    }
    getServiceRequestDetailById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: requestId, Status: 2 } });
        });
    }
    cancelServiceRequest(srviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 4, ModifiedBy: helperId }, { where: { ServiceRequestId: srviceId } });
        });
    }
    completeServiceRequest(srviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 3, ModifiedBy: helperId }, { where: { ServiceRequestId: srviceId } });
        });
    }
    getServiceDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({
                where: { ServiceRequestId: srId },
                include: ["ServiceRequestAddress", "ExtraService"],
            });
        });
    }
}
exports.UpcomingServicesRepository = UpcomingServicesRepository;
