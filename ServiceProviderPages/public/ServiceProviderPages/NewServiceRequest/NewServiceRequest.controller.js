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
            if (req.body.userTypeId === 2) {
                if (req.body.userId) {
                    return this.serviceRequestService
                        .getHelperDetailbyId(req.body.userId)
                        .then((helper) => {
                        if (helper) {
                            if (helper.ZipCode === null) {
                                return res.status(404).json({
                                    message: "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area",
                                });
                            }
                            else {
                                return this.serviceRequestService
                                    .getAllPendingServiceRequestByZipcode(helper.ZipCode, req.body.userId)
                                    .then((serviceRequests) => __awaiter(this, void 0, void 0, function* () {
                                    if (serviceRequests && serviceRequests.length > 0) {
                                        const sRequests = yield this.serviceRequestService.filterServiceRequestsCompatibleWithHelper(req.body.PetsAtHome, serviceRequests);
                                        if (sRequests && sRequests.length > 0) {
                                            const requestDetail = yield this.serviceRequestService.displayRequestDetail(sRequests);
                                            return res.status(200).json(requestDetail);
                                        }
                                        else {
                                            return res
                                                .status(404)
                                                .json({ message: "service requests not found" });
                                        }
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
        });
        this.getServiceRequestDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.body.userTypeId === 2) {
                return this.serviceRequestService
                    .getServiceRequestDetailById(req.params.requestId)
                    .then((serviceRequestDetail) => {
                    if (serviceRequestDetail) {
                        return res.status(200).json(serviceRequestDetail);
                    }
                    else {
                        return res
                            .status(404)
                            .json({ message: "request detail not available" });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        error: error,
                    });
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.acceptableNewServiceRequestOrNot = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.params.requestId) {
                return this.serviceRequestService
                    .getServiceRequestDetailById(req.params.requestId)
                    .then((serviceRequest) => {
                    if (serviceRequest) {
                        return this.serviceRequestService
                            .getAllServiceRequestsOfHelper(req.body.userId)
                            .then((serviceRequests) => __awaiter(this, void 0, void 0, function* () {
                            req.body.totalHour =
                                serviceRequest.ExtraHours + serviceRequest.ServiceHours;
                            if (serviceRequests) {
                                const { srId, matched } = yield this.serviceRequestService.FutureSameDateAndTime(serviceRequest.ServiceStartDate, serviceRequests, req.body.totalHour, serviceRequest.ServiceStartTime);
                                if (matched) {
                                    return res.status(422).json({
                                        message: "Another service request " +
                                            srId +
                                            " has already been assigned which has time overlap with this service request. You can’t pick this one!",
                                    });
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
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(422).json({
                            message: "This service request is no more available. It has been assigned to another provider",
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "proper input not found in request" });
            }
        });
        this.acceptNewServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.serviceRequestService
                .acceptNewServiceRequest(req.params.requestId, req.body.userId)
                .then((updatedServiceRequest) => {
                if (updatedServiceRequest[0] === 1) {
                    return this.serviceRequestService
                        .getHelpersByZipCode(req.body.ZipCode)
                        .then((helpers) => {
                        if (helpers) {
                            for (let hp in helpers) {
                                if (helpers[hp].Email === req.body.email) {
                                    continue;
                                }
                                const data = this.serviceRequestService.createData(helpers[hp].Email, req.params.requestId);
                                console.log(data);
                                mg.messages().send(data, (error, body) => {
                                    if (error) {
                                        return res.json({ error: error.message });
                                    }
                                });
                            }
                        }
                        return res
                            .status(200)
                            .json({ message: "service request accepted successfully" });
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                    });
                }
                else {
                    return res
                        .status(404)
                        .json({ message: "error in accepting service request" });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.serviceRequestService = serviceRequestService;
    }
}
exports.ServiceRequestController = ServiceRequestController;
