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
exports.ServiceRequestController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class ServiceRequestController {
    constructor(serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
        this.getAllNewServiceRequests = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceRequestService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 2) {
                                if (user.UserId) {
                                    return this.serviceRequestService
                                        .getHelperDetailbyId(user.UserId)
                                        .then((helper) => {
                                        if (helper) {
                                            if (helper.ZipCode === null) {
                                                return res.status(404).json({
                                                    message: "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area",
                                                });
                                            }
                                            else {
                                                return this.serviceRequestService
                                                    .getAllPendingServiceRequestByZipcode(helper.ZipCode, helper.UserId)
                                                    .then((serviceRequests) => __awaiter(this, void 0, void 0, function* () {
                                                    if (serviceRequests && serviceRequests.length > 0) {
                                                        const requestDetail = yield this.serviceRequestService.displayRequestDetail(serviceRequests);
                                                        return res.status(200).json(requestDetail);
                                                    }
                                                    else {
                                                        return res
                                                            .status(404)
                                                            .json({ message: "service requests not found" });
                                                    }
                                                }))
                                                    .catch((error) => {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                        }
                                        else {
                                            return res.status(404).json({ message: "helper not found" });
                                        }
                                    })
                                        .catch((error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res
                                        .status(422)
                                        .json({ message: "helperId not found in request body" });
                                }
                            }
                            else {
                                return res.status(401).json({ message: "unauthorised user" });
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
            console.log(SId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceRequestService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceRequestService
                                    .getServiceById(SId, findUser.ZipCode)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    let details = [];
                                    if (service) {
                                        const userdetails = yield this.serviceRequestService.getUserDetailbyId(service.UserId);
                                        const addressdetails = yield this.serviceRequestService.findAddressById(service.ServiceRequestId);
                                        const extradetails = yield this.serviceRequestService
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
                                        console.log(service.ServiceRequestId);
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
                                return res.status(400).json("You are not SP, Please login with your SP account!");
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
        this.acceptableNewServiceRequestOrNot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceRequestService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceRequestService
                                    .getServiceById(SId, findUser.ZipCode)
                                    .then((service) => {
                                    if (service) {
                                        req.body.ZipCode = service.ZipCode;
                                        return this.serviceRequestService
                                            .getAllServiceRequestsOfHelper(findUser.UserId)
                                            .then((serviceReq) => __awaiter(this, void 0, void 0, function* () {
                                            req.body.totalHour = service.ExtraHours + service.ServiceHours;
                                            if (serviceReq) {
                                                const { srId, matched } = yield this.serviceRequestService.FutureSameDateAndTime(service.ServiceStartDate, serviceReq, req.body.totalHour, service.ServiceStartTime);
                                                if (matched) {
                                                    return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
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
                                        return res.status(404).json("Service is assigned to another service provider!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not SP, Please login with your SP account!");
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
        this.acceptNewServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceRequestService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceRequestService
                                    .acceptNewServiceRequest(SId, findUser.UserId)
                                    .then((s) => {
                                    if (s) {
                                        return this.serviceRequestService
                                            .getHelpersByZipCode(req.body.ZipCode)
                                            .then((sp) => __awaiter(this, void 0, void 0, function* () {
                                            if (sp) {
                                                const users = sp.filter((s) => {
                                                    return findUser.UserId !== s.UserId;
                                                });
                                                let email = yield this.serviceRequestService.getEmail(users, req.body);
                                                for (let e in email) {
                                                    const serviceReq = yield this.serviceRequestService.createData(email[e], SId);
                                                    yield mg.messages().send(serviceReq);
                                                }
                                            }
                                            return res.status(200).json("Service Request is accepted by you successfully!");
                                        }))
                                            .catch((error) => {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(400).json("Error in accepting service!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not SP, Please login with your SP account!");
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
        this.serviceRequestService = serviceRequestService;
    }
}
exports.ServiceRequestController = ServiceRequestController;
