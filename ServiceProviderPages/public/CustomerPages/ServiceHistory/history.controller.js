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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            const token = req.headers.authorization;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.HistoryService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.HistoryService.getServiceRequestHistoryOfUser(user.UserId)
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
            const token = req.headers.authorization;
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.HistoryService
                            .findUser(user.Email)
                            .then((user) => {
                            // console.log(user)
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.HistoryService
                                    .getServiceById(SId)
                                    .then((service) => {
                                    console.log(service);
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
        this.giveRatings = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const SRId = parseInt(req.params.ServiceRequestId);
            req.body.RatingDate = new Date();
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.HistoryService
                            .findUser(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                return this.HistoryService
                                    .getRatingsById(SRId)
                                    .then((rating) => {
                                    if (rating) {
                                        return res.status(400).json("You already gave Ratings!");
                                    }
                                    else {
                                        if (SRId) {
                                            return this.HistoryService
                                                .getServiceByRequestId(SRId)
                                                .then((service) => {
                                                if (service) {
                                                    req.body.ServiceRequestId = service.ServiceRequestId;
                                                    if (user.UserTypeId === 1 && user.UserId === service.UserId) {
                                                        req.body.RatingFrom = service.UserId;
                                                        if (service.Status === 2 || service.ServiceProviderId) {
                                                            req.body.RatingTo = service.ServiceProviderId;
                                                            req.body.Ratings = this.HistoryService.getRatings(req.body);
                                                            return this.HistoryService
                                                                .giveRatings(req.body)
                                                                .then((ratings) => {
                                                                return res.status(200).json(ratings);
                                                            })
                                                                .catch((error) => {
                                                                return res.status(500).json({ error: error });
                                                            });
                                                        }
                                                        else {
                                                            return res.status(400).json("Service Request not completed or ServiceProvider Not found!");
                                                        }
                                                    }
                                                    else {
                                                        return res.status(400).json("Please login using your cutomer account!");
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
                                            return res.status(400).json("Service Request Id not exists!");
                                        }
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
        this.HistoryService = HistoryService;
    }
}
exports.HistoryController = HistoryController;
