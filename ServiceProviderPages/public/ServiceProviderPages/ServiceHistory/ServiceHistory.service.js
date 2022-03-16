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
exports.ServiceHistoryService = void 0;
const moment_1 = __importDefault(require("moment"));
class ServiceHistoryService {
    constructor(serviceHistoryRepository) {
        this.serviceHistoryRepository = serviceHistoryRepository;
        this.serviceHistoryRepository = serviceHistoryRepository;
    }
    getServiceRequestHistoryOfHelper(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getServiceRequestHistoryOfHelper(userId);
        });
    }
    getServiceRequestDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getServiceRequestDetailById(srId);
        });
    }
    getUserDetailById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getUserDetailById(userId);
        });
    }
    getRatingsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getRatingsOfHelper(parseInt(helperId));
        });
    }
    //local service
    compareDateWithCurrentDate(requestHistory) {
        const srHistory = [];
        const formatedDate2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (let sr in requestHistory) {
            const date = requestHistory[sr].ServiceStartDate;
            const formatedDate1 = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (formatedDate1 <= formatedDate2) {
                srHistory.push(requestHistory[sr]);
            }
        }
        return srHistory;
    }
    getDatForExport(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let exportHistory = [];
            for (let history in serviceRequest) {
                let user = yield this.serviceHistoryRepository.getUserDetailById(serviceRequest[history].UserId);
                exportHistory.push({
                    ServiceId: serviceRequest[history].ServiceRequestId,
                    StartDate: serviceRequest[history].ServiceStartDate,
                    Customer: (user === null || user === void 0 ? void 0 : user.FirstName) + " " + (user === null || user === void 0 ? void 0 : user.LastName),
                    Payment: serviceRequest[history].TotalCost,
                });
            }
            return exportHistory;
        });
    }
    gethistoryForDisplay(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let historyData = [];
            for (let sr in serviceRequest) {
                let user = yield this.serviceHistoryRepository.getUserDetailById(serviceRequest[sr].UserId);
                let address = yield this.serviceHistoryRepository.getServiceAddress(serviceRequest[sr].ServiceRequestId);
                const startTimeArray = serviceRequest[sr].ServiceStartTime.toString().split(":");
                const endTimeInt = (parseFloat(startTimeArray[0]) +
                    parseFloat(startTimeArray[1]) / 60 +
                    serviceRequest[sr].ServiceHours +
                    serviceRequest[sr].ExtraHours)
                    .toString()
                    .split(".");
                if (endTimeInt[1]) {
                    endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                }
                else {
                    endTimeInt[1] = "00";
                }
                if (user) {
                    if (address) {
                        historyData.push({
                            ServiceId: serviceRequest[sr].ServiceRequestId,
                            StartDate: serviceRequest[sr].ServiceStartDate.toString().split("-").reverse()
                                .join("-"),
                            Customer: user.FirstName + " " + user.LastName,
                            Address: {
                                Street: address.Addressline1,
                                HouseNumber: address.Addressline2,
                                City: address.City,
                                PostalCode: address.PostalCode,
                            },
                            Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1]
                        });
                    }
                }
            }
            return historyData;
        });
    }
    getRatingsForDisplay(ratings) {
        return __awaiter(this, void 0, void 0, function* () {
            let displayData = [];
            for (let rate in ratings) {
                let serviceRequest = yield this.serviceHistoryRepository.getServiceRequestDetailById(ratings[rate].ServiceRequestId);
                const startTimeArray = serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceStartTime.toString().split(":");
                const endTimeInt = (parseFloat(startTimeArray[0]) +
                    parseFloat(startTimeArray[1]) / 60 +
                    (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ServiceHours) +
                    (serviceRequest === null || serviceRequest === void 0 ? void 0 : serviceRequest.ExtraHours)).toString().split(".");
                if (endTimeInt[1]) {
                    endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                }
                else {
                    endTimeInt[1] = "00";
                }
                let user = yield this.serviceHistoryRepository
                    .getUserDetailById(ratings[rate].RatingFrom)
                    .then((user) => {
                    if (serviceRequest) {
                        if (user) {
                            displayData.push({
                                ServiceId: ratings[rate].ServiceRequestId,
                                StartDate: serviceRequest.ServiceStartDate.toString().split("-").reverse().join("-"),
                                Customer: user.FirstName + " " + user.LastName,
                                CustomerComment: ratings[rate].Comments,
                                Ratings: ratings[rate].Ratings,
                                Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1]
                            });
                        }
                    }
                });
            }
            return displayData;
        });
    }
}
exports.ServiceHistoryService = ServiceHistoryService;
