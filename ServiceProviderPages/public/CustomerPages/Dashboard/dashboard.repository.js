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
exports.DashboardRepository = void 0;
const index_1 = require("../../models/index");
class DashboardRepository {
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getAllFutureRequest(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { UserId: UserId, Status: 1 }, include: ['HelperRequest'] });
        });
    }
    getServiceById(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, Status: 1 }, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService'] });
        });
    }
    updateService(ServiceId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ ServiceStartDate: ServiceStartDate, ServiceStartTime: ServiceStartTime }, { where: { ServiceId: ServiceId } });
        });
    }
    updateServiceStatus(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.update({ Status: 3 }, { where: { ServiceId: ServiceId } });
        });
    }
    findSPById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
        });
    }
    findByAllSPId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
        });
    }
}
exports.DashboardRepository = DashboardRepository;
