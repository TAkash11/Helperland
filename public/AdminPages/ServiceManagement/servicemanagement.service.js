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
exports.ServiceManagementService = void 0;
class ServiceManagementService {
    constructor(ServiceManagementRepository) {
        this.ServiceManagementRepository = ServiceManagementRepository;
        this.ServiceManagementRepository = ServiceManagementRepository;
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.findUser(Email);
        });
    }
    findByServiceId(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.findByServiceId(ServiceId);
        });
    }
    findBySId(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.findBySId(ServiceRequestId);
        });
    }
    updateServiceStatus(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.updateServiceStatus(ServiceId);
        });
    }
    updateStatus(ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.updateStatus(ServiceRequestId);
        });
    }
    updateAddress(ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.updateAddress(ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City);
        });
    }
    findByAllSPId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.findByAllSPId(ServiceProviderId);
        });
    }
    updateService(ServiceRequestId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ServiceManagementRepository.updateService(ServiceRequestId, ServiceStartDate, ServiceStartTime);
        });
    }
    findAllService() {
        return __awaiter(this, void 0, void 0, function* () {
            let details = [];
            const service = yield this.ServiceManagementRepository.findAllService();
            for (let s in service) {
                const userdetails = yield this.ServiceManagementRepository.findUserById(service[s].UserId);
                const addressdetails = yield this.ServiceManagementRepository.findAddressById(service[s].ServiceRequestId);
                const spdetails = yield this.ServiceManagementRepository.findSPById(service[s].ServiceProviderId);
                const spRating = yield this.ServiceManagementRepository.findSpRatings(service[s].ServiceRequestId);
                const Time = (service[s].ServiceHours);
                const Extra = (service[s].ExtraHours);
                const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
                const total = ((Time + Extra).toString()).split('.');
                var time, Status, spId, spName, spAvatar, spRatings;
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
                if (service[s].Status === 1) {
                    Status = 'Booked';
                }
                else if (service[s].Status === 2) {
                    Status = 'Completed';
                }
                else if (service[s].Status === 3) {
                    Status = 'Cancelled';
                }
                else if (service[s].Status === 4) {
                    Status = 'Assigned';
                }
                else {
                    Status = null;
                }
                if (spdetails) {
                    spId = spdetails.UserId;
                    spName = (spdetails === null || spdetails === void 0 ? void 0 : spdetails.FirstName) + " " + (spdetails === null || spdetails === void 0 ? void 0 : spdetails.LastName);
                    if (spRating) {
                        spRatings = spRating === null || spRating === void 0 ? void 0 : spRating.Ratings;
                    }
                    else {
                        spRatings = null;
                    }
                }
                else {
                    spId = null;
                    spName = null;
                    spAvatar = null;
                }
                yield details.push({
                    ServiceId: service[s].ServiceId,
                    ServiceDate: service[s].ServiceStartDate,
                    Duration: service[s].ServiceStartTime + " - " + time,
                    CustomerDetails: {
                        UserId: userdetails === null || userdetails === void 0 ? void 0 : userdetails.UserId,
                        Name: (userdetails === null || userdetails === void 0 ? void 0 : userdetails.FirstName) + " " + (userdetails === null || userdetails === void 0 ? void 0 : userdetails.LastName),
                        Address: {
                            StreetName: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine1,
                            HouseNumber: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine2,
                            City: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.City,
                            PostalCode: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.PostalCode,
                        }
                    },
                    ServiceProvider: {
                        ServiceProviderId: spId,
                        Name: spName,
                        Ratings: spRatings
                    },
                    GrossAmount: service[s].TotalCost + " €",
                    NetAmount: service[s].TotalCost + " €",
                    Status: Status
                });
            }
            return details;
        });
    }
    findService(service, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let services = yield service.filter((x) => {
                return (!filters.ServiceId || (x.ServiceId && x.ServiceId === filters.ServiceId)) &&
                    (!filters.ZipCode || (x.CustomerDetails.Address.PostalCode && x.CustomerDetails.Address.PostalCode === filters.ZipCode)) &&
                    (!(filters.Status === 'Booked') || (x.Status === 'Booked' && x.Status === 'Booked')) &&
                    (!(filters.Status === 'Completed') || (x.Status === 'Completed' && x.Status === 'Completed')) &&
                    (!(filters.Status === 'Cancelled') || (x.Status === 'Cancelled' && x.Status === 'Cancelled')) &&
                    (!(filters.Status === 'Assigned') || (x.Status === 'Assigned' && x.Status === 'Assigned')) &&
                    (!filters.HelperName || (x.ServiceProvider.Name && x.ServiceProvider.Name === filters.HelperName)) &&
                    (!filters.CustomerName || (x.CustomerDetails.Name && x.CustomerDetails.Name === filters.CustomerName));
            });
            if (filters.FromDate) {
                if (services) {
                    services = services.filter(x => {
                        const FromDate = new Date(filters.FromDate);
                        const ServiceDate = new Date(x.ServiceDate);
                        return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                    });
                }
                else {
                    services = service.filter(x => {
                        const FromDate = new Date(filters.FromDate);
                        const ServiceDate = new Date(x.ServiceDate);
                        return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                    });
                }
            }
            if (filters.ToDate) {
                if (services) {
                    services = services.filter(x => {
                        const ToDate = new Date(filters.ToDate);
                        const ServiceDate = new Date(x.ServiceDate);
                        return (!ToDate || (ServiceDate && ToDate.getTime() >= ServiceDate.getTime()));
                    });
                }
                else {
                    services = service.filter(x => {
                        const ToDate = new Date(filters.ToDate);
                        const ServiceDate = new Date(x.ServiceDate);
                        return (!ToDate || (ServiceDate && ToDate.getTime() >= ServiceDate.getTime()));
                    });
                }
            }
            if (filters.Email) {
                const userbyEmail = yield this.ServiceManagementRepository.findUser(filters.Email);
                if (userbyEmail) {
                    if (services) {
                        services = services.filter(x => {
                            return x.CustomerDetails.UserId === userbyEmail.UserId ||
                                x.ServiceProvider.ServiceProviderId === userbyEmail.UserId;
                        });
                    }
                    else {
                        services = service.filter(x => {
                            return x.CustomerDetails.UserId === userbyEmail.UserId ||
                                x.ServiceProvider.ServiceProviderId === userbyEmail.UserId;
                        });
                    }
                }
                else {
                    services = [];
                }
            }
            return services;
        });
    }
    cancleService(Email, ServiceId) {
        const data = {
            from: 'helperlandteam@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
            <html>
            <body>
            <h3>"Service Request of ServiceId ${ServiceId} is cancelled by Admin on behalf of customer."</h3>
            </body>
            </html>`
        };
        return data;
    }
    getEmails(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = [];
            const cust = yield this.ServiceManagementRepository.findUserById(service.UserId);
            const sp = yield this.ServiceManagementRepository.findUserById(service.ServiceProviderId);
            if (cust && service.UserId) {
                email.push(cust.Email);
            }
            if (sp && service.ServiceProviderId) {
                email.push(sp.Email);
            }
            return email;
        });
    }
    rescheduleWithAddress(ServiceStartDate, ServiceStartTime, Email, ServiceId, AddressLine1, AddressLine2, PostalCode, City) {
        const data = {
            from: 'helperlandteam@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: `
                <!DOCTYPE>
                <html>
                <body>
                <p>Service Request of ServiceId <b>${ServiceId}</b> is rescheduled by Admin on behalf of customer.</p>
                <p>Service Request Details:</p>
                <p>New date: ${ServiceStartDate}.</p>
                <p>New time: ${ServiceStartTime}.</p>
                <p>New Address: ${AddressLine1}, ${AddressLine2}, ${City}, ${PostalCode}.</p>
                </body>
                </html>
                `
        };
        return data;
    }
    SPHasFutureSameDateTime(ServiceStartDate, ServiceRequest, totalHour, ServiceStartTime, SId) {
        let startDate;
        let startTime;
        let endTime;
        let ServiceId;
        const uTime = ServiceStartTime.split(":");
        if (uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        const updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        const enteredDate = new Date(ServiceStartDate);
        let isMatch;
        for (let s in ServiceRequest) {
            if (ServiceRequest[s].ServiceRequestId != SId) {
                if (new Date(ServiceRequest[s].ServiceStartDate).getTime() > enteredDate.getTime()) {
                    isMatch = false;
                }
                else if (new Date(ServiceRequest[s].ServiceStartDate).getTime() < enteredDate.getTime()) {
                    isMatch = false;
                }
                else {
                    const time = ServiceRequest[s].ServiceStartTime.toString().split(":");
                    if (time[1] === '30') {
                        time[1] = '0.5';
                    }
                    const availableTime = parseFloat(time[0]) + parseFloat(time[1]);
                    const availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours;
                    if (updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                        isMatch = false;
                    }
                    else {
                        ServiceId = ServiceRequest[s].ServiceRequestId;
                        startDate = ServiceRequest[s].ServiceStartDate;
                        const srTime = availableTime.toString().split('.');
                        if (srTime[1] === '5') {
                            srTime[1] = '30';
                        }
                        else {
                            srTime[1] = '00';
                        }
                        startTime = srTime.join(':');
                        const eTime = (availableTime + availableHour).toString().split('.');
                        if (parseInt(eTime[1]) === 5) {
                            eTime[1] = '30';
                        }
                        else {
                            eTime[1] = '00';
                        }
                        endTime = eTime.join(':');
                        isMatch = true;
                        break;
                    }
                }
            }
        }
        return { isMatch, startDate, startTime, endTime, ServiceId };
    }
}
exports.ServiceManagementService = ServiceManagementService;
