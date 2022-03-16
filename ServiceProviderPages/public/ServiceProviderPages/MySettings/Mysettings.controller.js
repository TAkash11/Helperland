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
exports.MySettingsController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class MySettingsController {
    constructor(mySettingsService) {
        this.mySettingsService = mySettingsService;
        this.getUserDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const UserId = parseInt(req.body.userId);
            if (UserId && req.body.userTypeId === 3) {
                return this.mySettingsService
                    .getUserDetailById(UserId)
                    .then((userDetail) => {
                    if (userDetail) {
                        return res.status(200).json(userDetail);
                    }
                    else {
                        return res.status(404).json({ message: 'detail not found' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'proper input not found in request' });
            }
        });
        this.updateUserDetailById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.body.userId && req.body.userTypeId === 3) {
                req.body.DateOfBirth = this.mySettingsService.convertStringToDate(req.body.DateOfBirth);
                return this.mySettingsService.updateUserDetailbyId(req.body.userId, req.body)
                    .then(updatedUser => {
                    if (updatedUser) {
                        next();
                    }
                    else {
                        return res.status(422).json({ message: 'error in updating user detail' });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'proper input not found in request' });
            }
        });
        this.updateOrCreateAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const UserId = parseInt(req.body.userId);
            if (UserId && req.body.userTypeId === 3) {
                return this.mySettingsService.getHelperAddressById(UserId)
                    .then(userAddress => {
                    if (userAddress) {
                        return this.mySettingsService.updateUserAddress(userAddress.AddressId, req.body)
                            .then(updatedAddress => {
                            if (updatedAddress) {
                                return res.status(200).json({ message: 'details updated successfully' });
                            }
                            else {
                                return res.status(422).json({ message: 'error in updating address' });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return this.mySettingsService.createAddress(UserId, req.body)
                            .then(address => {
                            if (address) {
                                return res.status(200).json(address);
                            }
                            else {
                                return res.status(500).json({ message: 'error in creating address' });
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
                return res.status(400).json({ message: 'proper input not found in request' });
            }
        });
        this.changeUserPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userId && req.body.userTypeId === 3) {
                return this.mySettingsService.getUserById(req.body.userId)
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        const match = yield bcrypt_1.default.compare(req.body.OldPassword, user.Password);
                        if (match) {
                            if (req.body.NewPassword === req.body.ConfirmPassword) {
                                const hashedPassword = yield bcrypt_1.default.hash(req.body.NewPassword, 10);
                                return this.mySettingsService.changePassword(req.body.userId, hashedPassword)
                                    .then(changedPassword => {
                                    if (changedPassword) {
                                        if (changedPassword[0] === 1) {
                                            return res.status(200).json({ message: 'password changed successfully' });
                                        }
                                        else {
                                            return res.status(404).json({ message: 'error in changing password' });
                                        }
                                    }
                                    else {
                                        return res.status(404).json({ message: 'error in changing password' });
                                    }
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json({ message: 'New Password and Confirm Password must be same' });
                            }
                        }
                        else {
                            return res.status(400).json({ message: 'Incorrect old password' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'user not found' });
                    }
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(400).json({ message: 'proper input not found in request' });
            }
        });
        this.mySettingsService = mySettingsService;
    }
}
exports.MySettingsController = MySettingsController;
