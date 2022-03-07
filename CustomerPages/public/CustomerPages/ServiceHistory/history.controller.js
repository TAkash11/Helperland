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
exports.HistoryController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class HistoryController {
    constructor(HistoryService) {
        this.HistoryService = HistoryService;
        this.history = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.HistoryService.getServiceRequestHistoryOfUser(parseInt(req.body.userId))
                .then(requestHistory => {
                if (requestHistory) {
                    if (requestHistory.length > 0) {
                        const pastDateHistory = this.HistoryService.compareDateWithCurrentDate(requestHistory);
                        if (requestHistory.length > 0) {
                            return res.status(200).json(pastDateHistory);
                        }
                        else {
                            return res.status(404).json({ message: 'Service request history not found in past' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Service request history not found' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Service request history not found' });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.getServiceById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const Id = parseInt(req.params.id);
            if (req.body.userTypeId === 4) {
                return this.HistoryService
                    .getServiceById(Id)
                    .then((serviceRequestDetail) => {
                    if ((serviceRequestDetail === null || serviceRequestDetail === void 0 ? void 0 : serviceRequestDetail.UserId) === req.body.userId) {
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
        this.giveRatings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const serviceId = parseInt(req.params.serviceId);
            req.body.RatingDate = new Date();
            return this.HistoryService.getRatingsByServiceRequestId(serviceId)
                .then(ratings => {
                if (ratings) {
                    return res.status(201).json({ message: 'ratings already set for this service request' });
                }
                else {
                    if (req.params.serviceId) {
                        return this.HistoryService.getServiceById(serviceId)
                            .then(serviceRequest => {
                            if (serviceRequest) {
                                req.body.ServiceRequestId = serviceRequest.ServiceRequestId;
                                if (req.body.userTypeId === 4 && req.body.userId === serviceRequest.UserId) {
                                    req.body.RatingFrom = serviceRequest.UserId;
                                    if (serviceRequest.Status === 3 && serviceRequest.ServiceProviderId) {
                                        req.body.RatingTo = serviceRequest.ServiceProviderId;
                                        req.body.Ratings = this.HistoryService.getRatings(req.body);
                                        console.log(req.body);
                                        return this.HistoryService.setRatings(req.body)
                                            .then(rating => {
                                            return res.status(200).json(rating);
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({
                                                error: error,
                                            });
                                        });
                                    }
                                    else {
                                        return res.status(400).json({ message: 'service request not completed or service provider not found' });
                                    }
                                }
                                else {
                                    return res.status(401).json({ message: 'unauthorised user' });
                                }
                            }
                            else {
                                return res.status(404).json({ message: 'srvice request not found' });
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
                        return res.status(404).json({ message: 'srvice request id not found' });
                    }
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.HistoryService = HistoryService;
    }
}
exports.HistoryController = HistoryController;
