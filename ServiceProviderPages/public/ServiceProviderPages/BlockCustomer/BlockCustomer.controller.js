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
            if (req.body.userTypeId === 3 && req.body.userId) {
                const customers = yield this.blockCustomerService.getCustomerWorkedWithHelper(req.body.userId);
                if (customers) {
                    if (customers.length > 0) {
                        return res.status(200).json(customers);
                    }
                    else {
                        return res.status(401).json({ message: "customers not found" });
                    }
                }
                else {
                    return res.status(404).json({ message: "customers not found" });
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.addCustomerInBlockList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3 && req.body.userId) {
                req.body.TargetUserId = req.params.userId;
                if (req.body.IsBlocked) {
                    const inCustomerList = yield this.blockCustomerService.hasHelperWorkedForCustomer(req.body.userId, req.params.userId);
                    if (inCustomerList) {
                        return this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                            .then(blockedCustomer => {
                            if (blockedCustomer && blockedCustomer.IsBlocked) {
                                return res.status(201).json({ message: 'customer alraedy in blocked list' });
                            }
                            else if (blockedCustomer && blockedCustomer.IsBlocked === false) {
                                return this.blockCustomerService.updateBlockedCustomer(req.body.userId, req.params.userId)
                                    .then(updatedCustomer => {
                                    if (updatedCustomer[0] === 1) {
                                        return res.status(200).json({ message: 'customer successfull added in block list' });
                                    }
                                    else {
                                        return res.status(422).json({ message: 'error in adding blocked list' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                req.body.UserId = req.body.userId;
                                req.body.IsFavorite = false;
                                return this.blockCustomerService.createBlockUnblockCustomer(req.body)
                                    .then(createdBlockedCustomer => {
                                    if (createdBlockedCustomer) {
                                        return res.status(200).json(createdBlockedCustomer);
                                    }
                                    else {
                                        return res.status(404).json({ message: 'error in creating data' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(400).json({ message: 'helper has not worked for this customer' });
                    }
                }
                else {
                    next();
                }
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.removeCustomerFromBlockList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.IsBlocked === false) {
                return this.blockCustomerService.getBlockedCustomer(req.body.userId, req.params.userId)
                    .then(blockedCustomer => {
                    if (blockedCustomer && blockedCustomer.IsBlocked) {
                        return this.blockCustomerService.updateUnBlockedCustomer(req.body.userId, req.params.userId)
                            .then(updatedCustomer => {
                            if (updatedCustomer[0] === 1) {
                                return res.status(200).json({ message: 'customer successfull added in unblock list' });
                            }
                            else {
                                return res.status(422).json({ message: 'error in adding unblocke list' });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else if (blockedCustomer && blockedCustomer.IsBlocked === false) {
                        return res.status(201).json({ message: 'customer alraedy in unblocke list' });
                    }
                    else {
                        return res.status(404).json({ message: 'no customer in blocklist to unblock' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'proper input not found in request body' });
            }
        });
        this.blockCustomerService = blockCustomerService;
    }
}
exports.BlockCustomerController = BlockCustomerController;
