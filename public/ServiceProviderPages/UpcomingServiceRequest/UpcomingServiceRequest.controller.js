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
exports.UpcomingServiceController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class UpcomingServiceController {
    constructor(upcomingService) {
        this.upcomingService = upcomingService;
        this.getUpcomingServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.upcomingService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 2) {
                                return this.upcomingService
                                    .getAllUpcomingRequest(user === null || user === void 0 ? void 0 : user.UserId)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    console.log(service);
                                    if (service && service.length > 0) {
                                        const serviceDetails = yield this.upcomingService.serviceReq(service);
                                        if (serviceDetails.length > 0) {
                                            return res.status(200).json(serviceDetails);
                                        }
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No service exists!!!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not HELPER, Please login as HELPER!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.cancelServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        if (!req.body.Reason) {
                            return res.status(400).json("Write Reason for cancelling Service!");
                        }
                        return this.upcomingService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.upcomingService
                                    .getServiceById(SId, findUser.ZipCode)
                                    .then((service) => {
                                    if (findUser.UserId === (service === null || service === void 0 ? void 0 : service.ServiceProviderId)) {
                                        for (let s in service) {
                                            return this.upcomingService
                                                .updateServiceStatus(SId, service.ServiceProviderId)
                                                .then((serviceRequest) => {
                                                if (serviceRequest.length > 0) {
                                                    if (service.UserId) {
                                                        return this.upcomingService
                                                            .findCustById(service.UserId)
                                                            .then((cust) => __awaiter(this, void 0, void 0, function* () {
                                                            if (cust === null || cust === void 0 ? void 0 : cust.Email) {
                                                                const email = yield this.upcomingService.cancleService(cust.Email, service.ServiceId, req.body.Reason);
                                                                yield mg.messages().send(email);
                                                                return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                            }
                                                            else {
                                                                return res.status(404).json("Customer not found!");
                                                            }
                                                        }))
                                                            .catch((error) => {
                                                            return res.status(500).json({ error: error });
                                                        });
                                                    }
                                                    else {
                                                        return res.status(400).json("Invalid Service Request!");
                                                    }
                                                }
                                                else {
                                                    return res.status(400).json("Cancellation of service is failed!");
                                                }
                                            })
                                                .catch((error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No service exists!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not HELPER, Please login as HELPER!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(404).json("No token exists!!");
            }
        });
        this.completeServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.upcomingService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 2) {
                                return this.upcomingService
                                    .getServiceById(SId, user.ZipCode)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    if (service) {
                                        // console.log(service)
                                        const date1 = new Date(service.ServiceStartDate);
                                        const date2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                                        console.log(date1);
                                        console.log(date2);
                                        if (date1.getTime() === date2.getTime()) {
                                            const Time = (service.ServiceHours);
                                            const Extra = (service.ExtraHours);
                                            const startTime = ((service.ServiceStartTime).toString().split(':'));
                                            const total = ((Time + Extra).toString()).split('.');
                                            var time;
                                            if (startTime[1] == "30") {
                                                if (total[1] == '5') {
                                                    time = (((+startTime[0]) + (+total[0]) + 1).toString()) + ":00";
                                                }
                                                else {
                                                    time = (((+startTime[0]) + (+total[0])).toString()) + ":30";
                                                }
                                            }
                                            else {
                                                if (total[1] == '5') {
                                                    time = (((+startTime[0]) + (+total[0])).toString()) + ":30";
                                                }
                                                else {
                                                    time = (((+startTime[0]) + (+total[0])).toString()) + ":00";
                                                }
                                            }
                                            yield service.update({ EndTime: time });
                                            const currentHour = new Date().getHours();
                                            const currentMinute = new Date().getMinutes();
                                            const timeHour = time.split(":")[0];
                                            const timeMinutes = time.split(":")[1];
                                            const servicetime = timeHour + "." + timeMinutes;
                                            const currentTime = currentHour + "." + currentMinute;
                                            if (servicetime < currentTime) {
                                                return this.upcomingService
                                                    .completeService(SId)
                                                    .then((service) => {
                                                    return res.status(200).json("Service Request Completed!");
                                                })
                                                    .catch((error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(400).json("Service Request is not Completed yet!");
                                            }
                                        }
                                        else if (date1.getTime() < date2.getTime()) {
                                            return this.upcomingService
                                                .completeService(SId)
                                                .then((service) => {
                                                return res.status(200).json("Service Request Completed!");
                                            })
                                                .catch((error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return res.status(400).json("Service is not completed!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not HELPER, Please login as HELPER!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.getServiceRequestDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.upcomingService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.upcomingService
                                    .getServiceById(SId, findUser.ZipCode)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    let details = [];
                                    if (service) {
                                        const userdetails = yield this.upcomingService.findUserById(service.UserId);
                                        const addressdetails = yield this.upcomingService.findAddressById(service.ServiceRequestId);
                                        const extradetails = yield this.upcomingService
                                            .findExtraById(service.ServiceRequestId)
                                            .then((extra) => {
                                            let ExtraService = [];
                                            if (extra) {
                                                for (var i = 0; i < extra.length; i++) {
                                                    const extras = extra[i].ServiceExtraId;
                                                    ExtraService.push(extras);
                                                }
                                                return ExtraService;
                                            }
                                        });
                                        const Time = (service.ServiceHours);
                                        const Extra = (service.ExtraHours);
                                        const StartTime = ((service.ServiceStartTime).toString().split(':'));
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
                                        service.update({ EndTime: time });
                                        if (userdetails) {
                                            if (addressdetails) {
                                                yield details.push({
                                                    ServiceStartDate: service.ServiceStartDate,
                                                    ServiceTime: service.ServiceStartTime + " - " + time,
                                                    Duration: service.ServiceHours + service.ExtraHours,
                                                    ServiceID: service.ServiceId,
                                                    Extras: extradetails,
                                                    Payment: service.TotalCost + " €",
                                                    CustomerName: userdetails.FirstName + " " + userdetails.LastName,
                                                    ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                    Comments: service.Comments,
                                                });
                                            }
                                        }
                                        if (details.length > 0) {
                                            return res.status(200).json(details);
                                        }
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not HELPER, Please login as HELPER!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.upcomingService = upcomingService;
    }
}
exports.UpcomingServiceController = UpcomingServiceController;
