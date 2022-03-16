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
exports.ServiceHistoryRepository = void 0;
const index_1 = require("../../models/index");
class ServiceHistoryRepository {
    getServiceRequestHistoryOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({
                where: { ServiceProviderId: helperId, Status: 3 },
                include: ["ServiceRequestAddress", "UserRequest"]
            });
        });
    }
    getServiceRequestDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({
                where: { ServiceRequestId: srId },
                include: ["ServiceRequestAddress", "ExtraService"],
            });
        });
    }
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: userId } });
        });
    }
    ;
    getRatingsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findAll({ where: { RatingTo: helperId }, include: ["RatingServiceRequest"] });
        });
    }
    getServiceAddress(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: requestId } });
        });
    }
    ;
    getCustomerWorkedWithHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: helperId, Status: 3 } });
        });
    }
}
exports.ServiceHistoryRepository = ServiceHistoryRepository;
