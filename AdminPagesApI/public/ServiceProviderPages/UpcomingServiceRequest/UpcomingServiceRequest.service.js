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
exports.UpcomingService = void 0;
class UpcomingService {
    constructor(upcomingServicesRepository) {
        this.upcomingServicesRepository = upcomingServicesRepository;
        this.upcomingServicesRepository = upcomingServicesRepository;
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.findUser(Email);
        });
    }
    getAllUpcomingRequest(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getAllUpcomingRequest(UserId);
        });
    }
    getServiceById(ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.getServiceById(ServiceId, ZipCode);
        });
    }
    updateServiceStatus(ServiceId, ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.updateServiceStatus(ServiceId, ServiceProviderId);
        });
    }
    findCustById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.findCustById(UserId);
        });
    }
    cancleService(Email, ServiceId, Reason) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
        <html>
        <body>
        <h3>"Service Request booked by you of ServiceId ${ServiceId} is cancelled by Service Provider due to this reason."</h3>
        <h3>Reason: ${Reason}.</h3>
        <p>Wait until another Service Provider accept your Service Request.</p>
        </body>
        </html>`
        };
        return data;
    }
    completeService(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.completeService(ServiceId);
        });
    }
    serviceReq(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let details = [];
            for (let s in service) {
                const userdetails = yield this.upcomingServicesRepository.findUserById(service[s].UserId);
                const addressdetails = yield this.upcomingServicesRepository.findAddressById(service[s].ServiceRequestId);
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
            return this.upcomingServicesRepository.findUserById(UserId);
        });
    }
    findAddressById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.findAddressById(ServiceRequestId);
        });
    }
    findExtraById(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upcomingServicesRepository.findExtraById(ServiceRequestId);
        });
    }
}
exports.UpcomingService = UpcomingService;
