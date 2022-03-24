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
exports.ServiceRequestService = void 0;
class ServiceRequestService {
    constructor(serviceRequestRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceRequestRepository = serviceRequestRepository;
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.findUser(Email);
        });
    }
    getHelperDetailbyId(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getHelperDetailById(helperId);
        });
    }
    getUserDetailbyId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getUserDetailById(userId);
        });
    }
    getServiceRequestDetailById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceById(ServiceId, ZipCode);
        });
    }
    getAllServiceRequestsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getAllServiceRequestsOfHelper(helperId);
        });
    }
    getHelpersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
        });
    }
    findAddressById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.findAddressById(ServiceRequestId);
        });
    }
    findExtraById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.findExtraById(ServiceRequestId);
        });
    }
    acceptNewServiceRequest(serviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.acceptNewServiceRequest(serviceId, helperId);
        });
    }
    ;
    getAllPendingServiceRequestByZipcode(zipCode, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);
            ;
        });
    }
    getEmail(User, body) {
        let Email = [];
        for (let u in User) {
            Email.push(User[u].Email);
        }
        return Email;
    }
    displayRequestDetail(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestDetail = [];
            for (let s in service) {
                const userdetails = yield this.serviceRequestRepository.getUserDetailById(service[s].UserId);
                const addressdetails = yield this.serviceRequestRepository.getRequestAddress(service[s].ServiceRequestId);
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
                        yield requestDetail.push({
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
            return requestDetail;
        });
    }
    FutureSameDateAndTime(date, serviceRequest, acceptTotalHour, time) {
        let srId;
        let matched = false;
        for (let sr in serviceRequest) {
            if (serviceRequest[sr].ServiceStartDate === date) {
                const acceptTime = time.toString().split(":");
                if (acceptTime[1] === "30") {
                    acceptTime[1] = "0.5";
                }
                const acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
                const availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
                if (availableTime[1] === "30") {
                    availableTime[1] = "0.5";
                }
                const availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
                const availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
                const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
                const totalAvailableTime = availableStartTime + availableTotalHour + 1;
                if (availableStartTime >= totalAcceptTime ||
                    acceptStartTime >= totalAvailableTime) {
                    matched = false;
                }
                else {
                    srId = serviceRequest[sr].ServiceRequestId;
                    matched = true;
                    break;
                }
            }
            else {
                matched = false;
            }
        }
        return { matched, srId };
    }
    createData(userEmail, srId) {
        const data = {
            from: 'akashamitthakkar@gmail.com',
            to: userEmail,
            subject: 'About assigned service request',
            html: `
            <h2>A service request ${srId} has already been accepted by someone else</h2>
            `
        };
        return data;
    }
}
exports.ServiceRequestService = ServiceRequestService;
