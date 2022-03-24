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
exports.ServiceManagementController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class ServiceManagementController {
    constructor(ServiceManagementService) {
        this.ServiceManagementService = ServiceManagementService;
        this.serviceRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const filterData = req.body;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.ServiceManagementService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                return this.ServiceManagementService
                                    .findAllService()
                                    .then((sr) => __awaiter(this, void 0, void 0, function* () {
                                    if (sr && sr.length > 0) {
                                        if (req.body) {
                                            const serviceArray = yield this.ServiceManagementService.findService(sr, filterData);
                                            if (serviceArray && serviceArray.length > 0) {
                                                return res.status(200).json(serviceArray);
                                            }
                                            else {
                                                return res.status(200).json("No Filtered service exists!");
                                            }
                                        }
                                        else {
                                            return res.status(200).json(sr);
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No service exists!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not Admin, Login Restricted!");
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
        this.rescheduleIfTimeSlotNotConflicts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        if (SId) {
                            return this.ServiceManagementService
                                .findUser(user.Email)
                                .then((finduser) => {
                                if (finduser && finduser.UserTypeId === 3) {
                                    const date = req.body.ServiceStartDate;
                                    return this.ServiceManagementService
                                        .findBySId(SId)
                                        .then((serviceReq) => {
                                        if (!serviceReq) {
                                            return res.status(404).json("No service found with this Id!");
                                        }
                                        if ((serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.Status) === 2) {
                                            return res.status(400).json("Service is completed, you can't reschedule it!");
                                        }
                                        else {
                                            if ((new Date(req.body.ServiceStartDate).getTime() === new Date(serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceStartDate).getTime()) && (req.body.ServiceStartTime === (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceStartTime))) {
                                                return this.ServiceManagementService
                                                    .updateAddress(SId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                                                    .then((address) => __awaiter(this, void 0, void 0, function* () {
                                                    const email = yield this.ServiceManagementService.getEmails(serviceReq);
                                                    for (let e in email) {
                                                        const sendmail = this.ServiceManagementService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                                        mg.messages().send(sendmail);
                                                    }
                                                    if ((serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.Status) === 3) {
                                                        return this.ServiceManagementService
                                                            .updateStatus(+req.params.ServiceRequestId)
                                                            .then((status) => {
                                                            return res.status(200).json(`Service Request with Service Id #${serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId} rescheduled successfully!`);
                                                        })
                                                            .catch((error) => {
                                                            return res.status(500).json({ error: error });
                                                        });
                                                    }
                                                    return res.status(200).json(`Service Request with Service Id #${serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId} rescheduled successfully!`);
                                                }))
                                                    .catch((error) => {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                req.body.totalHour = (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceHours) + (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ExtraHours);
                                                if (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceProviderId) {
                                                    req.body.ServiceProviderId = serviceReq.ServiceProviderId;
                                                    return this.ServiceManagementService
                                                        .findByAllSPId(serviceReq.ServiceProviderId)
                                                        .then((serviceReq) => __awaiter(this, void 0, void 0, function* () {
                                                        if (serviceReq) {
                                                            const { startDate, isMatch, startTime, endTime, ServiceId } = yield this.ServiceManagementService
                                                                .SPHasFutureSameDateTime(req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime);
                                                            if (isMatch) {
                                                                return res.status(200).json(`Another service request of ServiceId #${ServiceId} has been assigned to the service provider on ` + startDate + " from " + startTime +
                                                                    " to " + endTime + ". Either choose another date or pick up a different time slot.");
                                                            }
                                                            else {
                                                                next();
                                                            }
                                                        }
                                                        else {
                                                            next();
                                                        }
                                                    }));
                                                }
                                                else {
                                                    next();
                                                }
                                            }
                                        }
                                    })
                                        .catch((error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("User not exists!");
                                }
                            })
                                .catch((error) => {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(404).json("ServiceId not exists!");
                        }
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.RescheduleWithAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const date = req.body.ServiceStartDate;
            const SId = parseInt(req.params.ServiceId);
            return this.ServiceManagementService
                .findBySId(SId)
                .then((service) => {
                if (service) {
                    return this.ServiceManagementService
                        .updateService(+req.params.ServiceRequestId, new Date(date), req.body.ServiceStartTime)
                        .then((s) => __awaiter(this, void 0, void 0, function* () {
                        return this.ServiceManagementService
                            .updateAddress(SId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                            .then((address) => __awaiter(this, void 0, void 0, function* () {
                            const email = yield this.ServiceManagementService.getEmails(service);
                            for (let e in email) {
                                const sendmail = this.ServiceManagementService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], service === null || service === void 0 ? void 0 : service.ServiceId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                mg.messages().send(sendmail);
                            }
                            if ((service === null || service === void 0 ? void 0 : service.Status) === 3) {
                                return this.ServiceManagementService
                                    .updateStatus(SId)
                                    .then((status) => {
                                    return res.status(200).json(`Service Request with Service Id #${service === null || service === void 0 ? void 0 : service.ServiceId} rescheduled successfully!`);
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            return res.status(200).json(`Service Request with Service Id #${service === null || service === void 0 ? void 0 : service.ServiceId} rescheduled successfully!`);
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }))
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res.status(404).json("No service exists!");
                }
            })
                .catch((error) => {
                return res.status(500).json({ error: error });
            });
        });
        this.cancleServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.ServiceManagementService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 3) {
                                return this.ServiceManagementService
                                    .findByServiceId(SId)
                                    .then((service) => {
                                    if ((service === null || service === void 0 ? void 0 : service.Status) === 3) {
                                        return res.status(400).json("Service request already cancelled!");
                                    }
                                    else {
                                        if ((service === null || service === void 0 ? void 0 : service.Status) !== 2) {
                                            for (let s in service) {
                                                return this.ServiceManagementService
                                                    .updateServiceStatus(SId)
                                                    .then((serviceRequest) => __awaiter(this, void 0, void 0, function* () {
                                                    if (serviceRequest && serviceRequest.length > 0) {
                                                        const email = yield this.ServiceManagementService.getEmails(service);
                                                        for (let e in email) {
                                                            const sendmail = this.ServiceManagementService.cancleService(email[e], service.ServiceId);
                                                            mg.messages().send(sendmail);
                                                        }
                                                        return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                    }
                                                    else {
                                                        return res.status(400).json("Cancellation of service is failed!");
                                                    }
                                                }))
                                                    .catch((error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                        }
                                        else {
                                            return res.status(400).json("Service Request is completed, You can't cancle it!");
                                        }
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not Admin, Login Restricted!");
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
        this.ServiceManagementService = ServiceManagementService;
    }
}
exports.ServiceManagementController = ServiceManagementController;
