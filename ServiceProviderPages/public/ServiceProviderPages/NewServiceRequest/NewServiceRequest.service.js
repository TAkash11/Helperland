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
    getHelperDetailbyId(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getHelperDetailById(parseInt(helperId));
        });
    }
    getServiceRequestDetailById(requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getServiceRequestDetailById(parseInt(requestId));
        });
    }
    getAllServiceRequestsOfHelper(helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getAllServiceRequestsOfHelper(parseInt(helperId));
        });
    }
    getHelpersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.getHelpersByZipCode(zipCode);
        });
    }
    acceptNewServiceRequest(serviceId, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestRepository.acceptNewServiceRequest(parseInt(serviceId), parseInt(helperId));
        });
    }
    ;
    getAllPendingServiceRequestByZipcode(zipCode, helperId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sRequest = [];
            const serviceRequest = yield this.serviceRequestRepository.getAllPendingServiceRequestByZipcode(zipCode);
            const blockedCustomer = yield this.serviceRequestRepository.getBlockedCustomerOfhelper(parseInt(helperId));
            if (serviceRequest) {
                if (blockedCustomer) {
                    sRequest = serviceRequest.filter(sr => !blockedCustomer.find(rm => (rm.TargetUserId === sr.UserId)));
                }
            }
            return sRequest;
        });
    }
    filterServiceRequestsCompatibleWithHelper(includePets, serviceRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            let sRequests = [];
            if (includePets === false) {
                for (let sr in serviceRequests) {
                    if (serviceRequests[sr].HasPets === false) {
                        sRequests.push(serviceRequests[sr]);
                    }
                }
            }
            else {
                return serviceRequests;
            }
            return sRequests;
        });
    }
    displayRequestDetail(srequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestDetail = [];
            for (let sr in srequest) {
                const user = yield this.serviceRequestRepository.getUserDetailById(srequest[sr].UserId);
                const requestAddress = yield this.serviceRequestRepository.getRequestAddress(srequest[sr].ServiceRequestId);
                const startTimeArray = srequest[sr].ServiceStartTime.toString().split(":");
                const endTimeInt = (parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
                    srequest[sr].ServiceHours + srequest[sr].ExtraHours).toString().split(".");
                if (endTimeInt[1]) {
                    endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                }
                else {
                    endTimeInt[1] = "00";
                }
                if (user) {
                    if (requestAddress) {
                        requestDetail.push({
                            ServiceId: srequest[sr].ServiceRequestId,
                            ServiceDate: srequest[sr].ServiceStartDate.toString().split("-").reverse().join("-"),
                            Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1],
                            Customer: user.FirstName + " " + user.LastName,
                            Address: {
                                Street: requestAddress.AddressLine1,
                                HouseNumber: requestAddress.AddressLine2,
                                City: requestAddress.City,
                                PostalCode: requestAddress.PostalCode,
                            },
                            Payment: srequest[sr].TotalCost + " €"
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
