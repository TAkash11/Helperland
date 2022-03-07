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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const moment_1 = __importDefault(require("moment"));
class HistoryService {
    constructor(serviceHistoryRepository) {
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
    }
    ;
    getServiceRequestHistoryOfUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getServiceRequestHistoryOfUser(userId);
        });
    }
    ;
    getServiceById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getServiceById(srId);
        });
    }
    ;
    setRatings(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.setRatings(ratings);
        });
    }
    ;
    getRatingsByServiceRequestId(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getRatingsByServiceRequestId(srId);
        });
    }
    ;
    //local service
    compareDateWithCurrentDate(requestHistory) {
        const srHistory = [];
        const formatedDate2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        console.log(formatedDate2);
        for (let sr in requestHistory) {
            const date = requestHistory[sr].ServiceStartDate;
            const formatedDate1 = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            console.log(formatedDate1);
            if (formatedDate1 < formatedDate2) {
                srHistory.push(requestHistory[sr]);
            }
            console.log(srHistory);
        }
        return srHistory;
    }
    ;
    getRatings(body) {
        const Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService) / 3;
        return Ratings;
    }
}
exports.HistoryService = HistoryService;
