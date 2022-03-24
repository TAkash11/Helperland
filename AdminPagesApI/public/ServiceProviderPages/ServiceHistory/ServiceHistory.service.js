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
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.findUser(Email);
        });
    }
    getAllCompletedRequest(ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getAllCompletedRequest(ZipCode);
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getServiceById(ServiceId, ZipCode);
        });
    }
    getAllRatings(RatingTo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.getAllRatings(RatingTo);
        });
    }
    serviceReq(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let details = [];
            for (let s in service) {
                const userdetails = yield this.serviceHistoryRepository.findUserById(service[s].UserId);
                const addressdetails = yield this.serviceHistoryRepository.findAddressById(service[s].ServiceRequestId);
                const Time = (service[s].ServiceHours);
                const Extra = (service[s].ExtraHours);
                const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
                const total = ((Time + Extra).toString()).split('.');
                var time;
                if (StartTime[1] == "30") {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0]) + 1).toString()) + ":00";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                }
                else {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":00";
                    }
                }
                service[s].update({ EndTime: time });
                if (userdetails) {
                    if (addressdetails) {
                        yield details.push({
                            ServiceID: service[s].ServiceId,
                            ServiceStartDate: service[s].ServiceStartDate,
                            Duration: service[s].ServiceStartTime + " - " + time,
                            CustomerDetails: {
                                Name: userdetails.FirstName + " " + userdetails.LastName,
                                Address: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                            },
                            Payment: service[s].TotalCost + " €"
                        });
                    }
                }
            }
            return details;
        });
    }
    findUserById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.findUserById(UserId);
        });
    }
    findAddressById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.findAddressById(ServiceRequestId);
        });
    }
    findExtraById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceHistoryRepository.findExtraById(ServiceRequestId);
        });
    }
    compareDate(history) {
        const sphistory = [];
        const currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (let h in history) {
            const date = history[h].ServiceStartDate;
            const ServiceStartDate = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (ServiceStartDate <= currentDate) {
                sphistory.push(history[h]);
            }
        }
        return sphistory;
    }
    Export(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let exportHistory = [];
            for (let s in service) {
                let userdetails = yield this.findUserById(service[s].UserId);
                const addressdetails = yield this.serviceHistoryRepository.findAddressById(service[s].ServiceRequestId);
                const Time = (service[s].ServiceHours);
                const Extra = (service[s].ExtraHours);
                const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
                const total = ((Time + Extra).toString()).split('.');
                var time;
                if (StartTime[1] == "30") {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0]) + 1).toString()) + ":00";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                }
                else {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":00";
                    }
                }
                service[s].update({ EndTime: time });
                exportHistory.push({
                    ServiceId: service[s].ServiceId,
                    StartDate: service[s].ServiceStartDate,
                    Duration: service[s].ServiceStartTime + " - " + time,
                    CustomerName: (userdetails === null || userdetails === void 0 ? void 0 : userdetails.FirstName) + " " + (userdetails === null || userdetails === void 0 ? void 0 : userdetails.LastName),
                    Address: (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine1) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine2) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.City) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.PostalCode)
                });
            }
            return exportHistory;
        });
    }
    Ratings(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            let details = [];
            for (let r in rating) {
                let service = yield this.serviceHistoryRepository.findService(rating[r].ServiceRequestId);
                const Time = (service === null || service === void 0 ? void 0 : service.ServiceHours);
                const Extra = (service === null || service === void 0 ? void 0 : service.ExtraHours);
                const StartTime = ((service === null || service === void 0 ? void 0 : service.ServiceStartTime).toString().split(':'));
                const total = ((Time + Extra).toString()).split('.');
                var time;
                if (StartTime[1] == "30") {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0]) + 1).toString()) + ":00";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                }
                else {
                    if (total[1] == '5') {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                    }
                    else {
                        time = (((+StartTime[0]) + (+total[0])).toString()) + ":00";
                    }
                }
                service === null || service === void 0 ? void 0 : service.update({ EndTime: time });
                let userdetails = yield this.serviceHistoryRepository
                    .findByUId(rating[r].RatingFrom)
                    .then((user) => {
                    if (service) {
                        if (user) {
                            details.push({
                                ServiceID: service.ServiceId,
                                ServiceStartDate: service.ServiceStartDate,
                                Duration: service.ServiceStartTime + " - " + time,
                                Name: user.FirstName + " " + user.LastName,
                                Comments: rating[r].Comments,
                                Ratings: rating[r].Ratings
                            });
                        }
                    }
                });
            }
            return details;
        });
    }
}
exports.ServiceHistoryService = ServiceHistoryService;
