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
exports.BlockCustomerController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class BlockCustomerController {
    constructor(blockCustomerService) {
        this.blockCustomerService = blockCustomerService;
        this.getCustomerWorkedWithHelper = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.blockCustomerService
                            .findUser(user.Email)
                            .then((findUser) => __awaiter(this, void 0, void 0, function* () {
                            if (findUser && findUser.UserTypeId === 2) {
                                const cust = yield this.blockCustomerService.findAllcustSpHadWorkedFor(findUser.UserId);
                                if (cust) {
                                    if (cust.length > 0) {
                                        return res.status(200).json(cust);
                                    }
                                    else {
                                        return res.status(404).json("Customer not found!");
                                    }
                                }
                                else {
                                    return res.status(404).json("No customer exists!");
                                }
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                        }))
                            .catch((error) => {
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.status(404).json("No token exists!");
            }
        });
        this.addCustomerInBlockList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const UId = parseInt(req.params.userId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.blockCustomerService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if (findUser && findUser.UserTypeId === 2) {
                                req.body.UserId = findUser.UserId;
                                req.body.TargetUserId = UId;
                                return this.blockCustomerService
                                    .findServiceBySpId(findUser.UserId)
                                    .then((service) => {
                                    if (service) {
                                        const cId = this.blockCustomerService.findAllcustIdSpHadWorkedFor(service);
                                        if (cId.length > 0) {
                                            const custArray = cId.includes(UId);
                                            if (custArray) {
                                                if (req.body.IsBlocked) {
                                                    return this.blockCustomerService
                                                        .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                                                        .then((customer) => {
                                                        if (customer) {
                                                            if (customer.IsBlocked) {
                                                                return res.status(400).json("Customer already in blocked list!");
                                                            }
                                                            else {
                                                                return this.blockCustomerService
                                                                    .updateBlockedCust(req.body)
                                                                    .then((updateCust) => {
                                                                    if (updateCust.length > 0) {
                                                                        return res.status(200).json("Customer addedd in blocked list!");
                                                                    }
                                                                    else {
                                                                        return res.status(400).json("Failure in adding customer in blocked list!");
                                                                    }
                                                                })
                                                                    .catch((error) => {
                                                                    return res.status(500).json(error);
                                                                });
                                                            }
                                                        }
                                                        else {
                                                            req.body.IsFavorite = false;
                                                            return this.blockCustomerService
                                                                .createBlockedCust(req.body)
                                                                .then((blockedCust) => {
                                                                if (blockedCust) {
                                                                    return res.status(200).json("Blocked customer created successfully!");
                                                                }
                                                                else {
                                                                    return res.status(404).json("Failure in creating blocked customer!");
                                                                }
                                                            })
                                                                .catch((error) => {
                                                                return res.status(500).json(error);
                                                            });
                                                        }
                                                    })
                                                        .catch((error) => {
                                                        return res.status(500).json(error);
                                                    });
                                                }
                                                else if (req.body.IsBlocked === false) {
                                                    next();
                                                }
                                                else {
                                                    return res.status(404).json("Not Found!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("Service Provider not worked for customer in past!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("SP not worked with any customer in past!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json(error);
                                });
                            }
                            else {
                                return res.status(404).json("No Sp exists!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.status(404).json("No token exists!");
            }
        });
        this.removeCustomerFromBlockList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const UId = parseInt(req.params.userId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.blockCustomerService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if (findUser && findUser.UserTypeId === 2) {
                                return this.blockCustomerService
                                    .findBlockedCust(findUser.UserId, UId)
                                    .then((blocked) => {
                                    if (blocked) {
                                        if (blocked.IsBlocked) {
                                            return this.blockCustomerService
                                                .updateBlockedCust(req.body)
                                                .then((blockedCust) => {
                                                if (blockedCust) {
                                                    return res.status(200).json("Blocked Customer updated successfully!");
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                                .catch((error) => {
                                                return res.status(500).json(error);
                                            });
                                        }
                                        else if (blocked.IsBlocked === false) {
                                            return res.status(400).json("Customer already in unblocked list!");
                                        }
                                        else {
                                            return res.status(404).json("No customer exists to remove!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No customer exists!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json(error);
                                });
                            }
                            else {
                                return res.status(404).json("No Sp Exists!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.status(404).json("No token exists!");
            }
        });
        this.blockCustomerService = blockCustomerService;
    }
}
exports.BlockCustomerController = BlockCustomerController;
