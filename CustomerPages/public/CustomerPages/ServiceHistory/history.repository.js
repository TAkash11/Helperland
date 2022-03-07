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
exports.HistoryRepository = void 0;
const index_1 = require("../../models/index");
const sequelize_1 = require("sequelize");
class HistoryRepository {
    getServiceRequestHistoryOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({
                where: { UserId: userId, Status: {
                        [sequelize_1.Op.or]: [3, 4]
                    } },
            });
        });
    }
    getServiceById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({
                where: { ServiceRequestId: srId },
                include: ["ServiceRequestAddress", "ExtraService"],
            });
        });
    }
    setRatings(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.create(ratings);
        });
    }
    getRatingsByServiceRequestId(serviceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findOne({ where: { ServiceRequestId: serviceRequestId } });
        });
    }
}
exports.HistoryRepository = HistoryRepository;
