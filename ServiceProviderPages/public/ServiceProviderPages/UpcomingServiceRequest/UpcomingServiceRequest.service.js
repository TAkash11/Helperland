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
exports.UpcomingService = void 0;
const moment_1 = __importDefault(require("moment"));
class UpcomingService {
    constructor(upcomingServicesRepository) {
        this.upcomingServicesRepository = upcomingServicesRepository;
        this.upcomingServicesRepository = upcomingServicesRepository;
    }
    getAllUpcomingServicerequests(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getAllUpcomingServicerequests(parseInt(helperId))
                .then(serviceRequests => {
                const sRequest = [];
                const currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                if (serviceRequests) {
                    for (let sr in serviceRequests) {
                        let serviceRequestDate = new Date(serviceRequests[sr].ServiceStartDate);
                        if (currentDate > serviceRequestDate) {
                            continue;
                        }
                        sRequest.push(serviceRequests[sr]);
                    }
                }
                return sRequest;
            });
        });
    }
    getServiceRequestDetailById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId));
        });
    }
    cancelServiceRequest(serviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.cancelServiceRequest(parseInt(serviceId), parseInt(helperId));
        });
    }
    ;
    completeServiceRequest(serviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.completeServiceRequest(parseInt(serviceId), parseInt(helperId));
        });
    }
    ;
    getServiceRequestDetailForCompleteRequest(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceRequestDetailById(parseInt(requestId));
        });
    }
    getServiceDetailById(srId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceDetailById(srId);
        });
    }
    ;
    isRequestTimeLessThanCurrentDateAndTime(serviceRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const sRequestDate = new Date((_a = serviceRequest) === null || _a === void 0 ? void 0 : _a.ServiceStartDate);
            const currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
            var time = serviceRequest.ServiceStartTime.toString().split(":");
            const requestTime = parseFloat(time[0]) + parseFloat(time[1]) / 60;
            const requestTotalTime = requestTime + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
            const currentTotalTime = new Date().getHours() + new Date().getMinutes() / 60;
            if (sRequestDate < currentDate) {
                return serviceRequest;
            }
            else if (sRequestDate > currentDate) {
                return null;
            }
            else {
                if (requestTotalTime < currentTotalTime) {
                    return serviceRequest;
                }
                else {
                    return null;
                }
            }
        });
    }
}
exports.UpcomingService = UpcomingService;
