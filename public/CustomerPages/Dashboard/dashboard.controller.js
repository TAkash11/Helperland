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
exports.DashboardController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({ apiKey: process.env.MAILGUN_API, domain: DOMAIN });
require('dotenv').config();
class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.dashboard = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let serviceRequest = [];
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.dashboardService
                            .findUser(user.Email)
                            .then((user) => {
                            // console.log(user);
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.dashboardService
                                    .getAllFutureRequest(user.UserId)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    // console.log(service)
                                    if (service) {
                                        if (service.length > 0) {
                                            for (let s in service) {
                                                const date1 = new Date(service[s].ServiceStartDate);
                                                const date2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                                                if (date1 > date2) {
                                                    serviceRequest.push(service[s]);
                                                }
                                            }
                                            if (serviceRequest.length > 0) {
                                                return res.status(200).json({ serviceRequest });
                                            }
                                            else {
                                                return res.status(400).json("No service exists!");
                                            }
                                        }
                                        else {
                                            return res.status(400).json("No service exists!!");
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
                                return res.status(400).json("You are not Customer, Please login with you customer account!");
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
        this.getServiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.dashboardService
                            .findUser(user.Email)
                            .then((user) => {
                            //   console.log(user);
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.dashboardService
                                    .getServiceById(SId)
                                    .then((service) => {
                                    if (service) {
                                        if (user.UserId === service.UserId) {
                                            return res.status(200).json(service);
                                        }
                                        else {
                                            return res.status(404).json("No service request detail found with this service ID!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not Customer, Please login with you customer account!");
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
        this.rescheduleService = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const isTrue = this.dashboardService.compareDate(req.body.ServiceStartDate);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        if (isTrue) {
                            return this.dashboardService
                                .findUser(user.Email)
                                .then((user) => {
                                if (user) {
                                    return this.dashboardService
                                        .getServiceById(+req.params.ServiceId)
                                        .then((service) => {
                                        if (service) {
                                            req.body.totalHour = service.ServiceHours + service.ExtraHours;
                                            if (service.UserId === user.UserId) {
                                                if (service.ServiceProviderId) {
                                                    req.body.ServiceProviderId = service.ServiceProviderId;
                                                    return this.dashboardService
                                                        .findByAllSPId(service.ServiceProviderId)
                                                        .then((serviceReq) => __awaiter(this, void 0, void 0, function* () {
                                                        if (serviceReq) {
                                                            const { startDate, isMatch, startTime, endTime } = yield this.dashboardService.SPHasFutureSameDateTime(req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime);
                                                            if (isMatch) {
                                                                return res.status(200).json("Another service request has been assigned to the service provider on " + startDate + " from " + startTime +
                                                                    " to " + endTime + ". Either choose another date or pick up a different time slot.");
                                                            }
                                                            else {
                                                                next();
                                                            }
                                                        }
                                                        else {
                                                            next();
                                                        }
                                                    }))
                                                        .catch((error) => {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    next();
                                                }
                                            }
                                            else {
                                                return res.status(404).json("User not exists!");
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
                                    return res.status(404).json("User not exists!");
                                }
                            })
                                .catch((error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(400).json("Enter Correct date i.e. date greater than today's date!");
                        }
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.rescheduleIfTimeSlotNotConflicts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        if (req.params.ServiceId) {
                            return this.dashboardService
                                .findUser(user.Email)
                                .then((finduser) => {
                                if (finduser) {
                                    const date = req.body.ServiceStartDate;
                                    return this.dashboardService
                                        .updateService(+req.params.ServiceId, new Date(date), req.body.ServiceStartTime)
                                        .then((service) => {
                                        if (service.length > 0) {
                                            return this.dashboardService
                                                .getServiceById(+req.params.ServiceId)
                                                .then((helper) => __awaiter(this, void 0, void 0, function* () {
                                                if (helper === null || helper === void 0 ? void 0 : helper.ServiceProviderId) {
                                                    return this.dashboardService
                                                        .findSPById(helper.ServiceProviderId)
                                                        .then((sp) => __awaiter(this, void 0, void 0, function* () {
                                                        if (sp === null || sp === void 0 ? void 0 : sp.Email) {
                                                            const email = yield this.dashboardService.rescheduleService(req.body.ServiceStartDate, req.body.ServiceStartTime, sp.Email, +req.params.ServiceId);
                                                            yield mg.messages().send(email);
                                                            return res.status(200).json("Service Request rescheduled successfully!");
                                                        }
                                                    }))
                                                        .catch((error) => {
                                                        console.log(error);
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    return res.status(200).json("Service Request rescheduled successfully!");
                                                }
                                            }))
                                                .catch((error) => {
                                                console.log(error);
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return res.status(400).json("Failed Rescheduling Service!");
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
        this.cancleServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                        return this.dashboardService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.dashboardService
                                    .getServiceById(SId)
                                    .then((service) => {
                                    if (user.UserId === (service === null || service === void 0 ? void 0 : service.UserId)) {
                                        if ((service === null || service === void 0 ? void 0 : service.Status) === 3) {
                                            return res.status(400).json("Service request already cancelled!");
                                        }
                                        else {
                                            if (service.Status !== 2) {
                                                for (let s in service) {
                                                    return this.dashboardService
                                                        .updateServiceStatus(SId)
                                                        .then((serviceRequest) => {
                                                        if (serviceRequest.length > 0) {
                                                            if (service.ServiceProviderId) {
                                                                return this.dashboardService
                                                                    .findSPById(service.ServiceProviderId)
                                                                    .then((helper) => __awaiter(this, void 0, void 0, function* () {
                                                                    if (helper === null || helper === void 0 ? void 0 : helper.Email) {
                                                                        const email = yield this.dashboardService.cancleService(helper.Email, service.ServiceId, req.body.Reason);
                                                                        yield mg.messages().send(email);
                                                                        return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                                    }
                                                                    else {
                                                                        return res.status(404).json("Helper not found!");
                                                                    }
                                                                }))
                                                                    .catch((error) => {
                                                                    return res.status(500).json({ error: error });
                                                                });
                                                            }
                                                            else {
                                                                return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
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
                                                return res.status(400).json("Service Request is completed, You can't cancle it!");
                                            }
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
                                return res.status(400).json("Please login as a customer");
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
        this.dashboardService = dashboardService;
    }
}
exports.DashboardController = DashboardController;
