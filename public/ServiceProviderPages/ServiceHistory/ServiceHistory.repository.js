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
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getAllCompletedRequest(ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ZipCode: ZipCode, Status: 2 }, include: ['ServiceRequestAddress'] });
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 2 }, include: ['ServiceRequestAddress', 'ExtraService'] });
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
    findByUId(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId } });
        });
    }
    getAllRatings(RatingTo) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findAll({ where: { RatingTo: RatingTo } });
        });
    }
    findService(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
}
exports.ServiceHistoryRepository = ServiceHistoryRepository;
