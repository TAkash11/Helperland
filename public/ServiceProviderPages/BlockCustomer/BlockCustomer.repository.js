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
exports.BlockCustomerRepository = void 0;
const index_1 = require("../../models/index");
class BlockCustomerRepository {
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { Email: Email } });
        });
    }
    getAllRatings(RatingTo) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Rating.findAll({ where: { RatingTo: RatingTo } });
        });
    }
    findServiceBySpId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
        });
    }
    findAllcustSpHadWorkedFor(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId, Status: 2 } });
        });
    }
    findBlockedCust(UserId, custId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.findOne({ where: { UserId: UserId, TargetUserId: custId } });
        });
    }
    updateBlockedCust(blocked) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.update({ IsBlocked: blocked.IsBlocked }, { where: { UserId: blocked.UserId, TargetUserId: blocked.TargetUserId } });
        });
    }
    createBlockedCust(favorite) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.FavoriteAndBlocked.create(favorite);
        });
    }
    findService(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId } });
        });
    }
    findByUId(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { UserId: UserId } });
        });
    }
}
exports.BlockCustomerRepository = BlockCustomerRepository;
