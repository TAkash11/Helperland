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
            if (req.body.userId && req.body.userTypeId === 2) {
                return this.upcomingService
                    .getAllUpcomingServicerequests(req.body.userId)
                    .then((serviceRequests) => {
                    if (serviceRequests) {
                        if (serviceRequests.length > 0) {
                            return res.status(200).json(serviceRequests);
                        }
                        else {
                            return res
                                .status(404)
                                .json({ message: "no upcoming service requests found" });
                        }
                    }
                    else {
                        return res
                            .status(404)
                            .json({ message: "no upcoming service requests found" });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.cancelServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 3) {
                if (req.params.requestId) {
                    return this.upcomingService
                        .getServiceRequestDetailById(req.params.requestId)
                        .then((serviceRequest) => {
                        if (serviceRequest) {
                            if (serviceRequest.ServiceProviderId === req.body.userId) {
                                return this.upcomingService
                                    .cancelServiceRequest(req.params.requestId, req.body.userId)
                                    .then((updatedrequest) => {
                                    if (updatedrequest[0] === 1) {
                                        return res.status(200).json({
                                            message: "service request cancelled successfully",
                                        });
                                    }
                                    else {
                                        return res.status(422).json({
                                            message: "error in cancelling service request",
                                        });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(401).json({ message: "unauthorised user" });
                            }
                        }
                        else {
                            return res
                                .status(404)
                                .json({ message: "service request detail not found" });
                        }
                    });
                }
                else {
                    return res
                        .status(400)
                        .json({ message: "service request id not found" });
                }
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.completeServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 2) {
                if (req.params.requestId) {
                    return this.upcomingService
                        .getServiceRequestDetailForCompleteRequest(req.params.requestId)
                        .then((serviceRequest) => {
                        if (serviceRequest) {
                            if (serviceRequest.ServiceProviderId === req.body.userId) {
                                return this.upcomingService
                                    .isRequestTimeLessThanCurrentDateAndTime(serviceRequest)
                                    .then((serviceRequest) => {
                                    if (serviceRequest) {
                                        return this.upcomingService
                                            .completeServiceRequest(req.params.requestId, req.body.userId)
                                            .then((updatedrequest) => {
                                            if (updatedrequest[0] === 1) {
                                                return res
                                                    .status(200)
                                                    .json({
                                                    message: "service request completed successfully",
                                                });
                                            }
                                            else {
                                                return res
                                                    .status(422)
                                                    .json({
                                                    message: "error in updating service request",
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
                                            .json({
                                            message: "You can not complete service request before end time",
                                        });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(401).json({ message: "unauthorised user" });
                            }
                        }
                        else {
                            return res
                                .status(404)
                                .json({ message: "service request detail not found" });
                        }
                    });
                }
                else {
                    return res
                        .status(400)
                        .json({ message: "service request id not found" });
                }
            }
            else {
                return res.status(401).json({ message: "unauthorised user" });
            }
        });
        this.getServiceRequestDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const Id = parseInt(req.params.id);
            if (req.body.userTypeId === 2) {
                return this.upcomingService
                    .getServiceDetailById(Id)
                    .then((serviceRequestDetail) => {
                    console.log(serviceRequestDetail);
                    if ((serviceRequestDetail === null || serviceRequestDetail === void 0 ? void 0 : serviceRequestDetail.ServiceProviderId) === req.body.userId) {
                        return res.status(200).json(serviceRequestDetail);
                    }
                    else {
                        return res.status(404).json({
                            message: "No service request detail found for this request",
                        });
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
        this.upcomingService = upcomingService;
    }
}
exports.UpcomingServiceController = UpcomingServiceController;
