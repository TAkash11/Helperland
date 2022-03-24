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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const saltRouds = 10;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class MySettingsController {
    constructor(mySettingsService) {
        this.mySettingsService = mySettingsService;
        this.getUserDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        return this.mySettingsService
                            .findUserByEmail(user.Email)
                            .then((findUser) => {
                            if (findUser && findUser.UserTypeId === 2) {
                                return this.mySettingsService
                                    .findByUserId(findUser.UserId)
                                    .then((address) => {
                                    if (address) {
                                        return res.status(200).json({
                                            FirstName: findUser.FirstName,
                                            LastName: findUser.LastName,
                                            Email: findUser.Email,
                                            Mobile: findUser.Mobile,
                                            DateOfBirth: findUser.DateOfBirth,
                                            StreetName: address.AddressLine1,
                                            HouseNumber: address.AddressLine2,
                                            PostalCode: address.PostalCode,
                                            City: address.City
                                        });
                                    }
                                    else {
                                        return res.status(200).json({
                                            FirstName: findUser.FirstName,
                                            LastName: findUser.LastName,
                                            Email: findUser.Email,
                                            Mobile: findUser.Mobile,
                                            DateOfBirth: findUser.DateOfBirth,
                                        });
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("SP not exists!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(404).json("No token exists!");
            }
        });
        this.updateUserDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        const { Email } = user;
                        if (Email) {
                            return this.mySettingsService
                                .findUserByEmail(Email)
                                .then((findUser) => {
                                if (findUser) {
                                    const FirstName = req.body.FirstName;
                                    const LastName = req.body.LastName;
                                    const Mobile = req.body.Mobile;
                                    const DateOfBirth = req.body.DateOfBirth;
                                    return this.mySettingsService
                                        .updateSPDetails(findUser.Email, FirstName, LastName, Mobile, DateOfBirth)
                                        .then((user) => {
                                        return this.mySettingsService
                                            .findByUserId(findUser.UserId)
                                            .then((address) => {
                                            if (address) {
                                                const StreetName = req.body.AddressLine1;
                                                const HouseNumber = req.body.AddressLine2;
                                                const PostalCode = req.body.PostalCode;
                                                const City = req.body.City;
                                                console.log("Hello");
                                                return this.mySettingsService
                                                    .updateUserAddress(findUser.UserId, req.body.AddressLine1, req.body.AddressLine2, req.body.City, req.body.PostalCode, req.body.Mobile)
                                                    .then((address) => {
                                                    if (address) {
                                                        return res.status(200).json({
                                                            FirstName: FirstName,
                                                            LastName: LastName,
                                                            Email: findUser.Email,
                                                            Mobile: Mobile,
                                                            DateOfBirth: DateOfBirth,
                                                            StreetName: StreetName,
                                                            HouseNumber: HouseNumber,
                                                            PostalCode: PostalCode,
                                                            City: City
                                                        });
                                                    }
                                                    else {
                                                        return res.status(400).json("Failure in updating address!");
                                                    }
                                                })
                                                    .catch((error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                if ((req.body.AddressLine1, req.body.AddressLine2, req.body.PostalCode, req.body.City)) {
                                                    req.body.UserId = findUser.UserId;
                                                    req.body.Email = findUser.Email;
                                                    req.body.IsDeleted = false;
                                                    return this.mySettingsService
                                                        .createUserAddress(req.body)
                                                        .then((address) => {
                                                        if (address) {
                                                            const StreetName = req.body.AddressLine1;
                                                            const HouseNumber = req.body.AddressLine2;
                                                            const PostalCode = req.body.PostalCode;
                                                            const City = req.body.City;
                                                            return res.status(200).json({
                                                                FirstName: FirstName,
                                                                LastName: LastName,
                                                                Email: findUser.Email,
                                                                Mobile: Mobile,
                                                                DateOfBirth: DateOfBirth,
                                                                StreetName: StreetName,
                                                                HouseNumber: HouseNumber,
                                                                PostalCode: PostalCode,
                                                                City: City
                                                            });
                                                        }
                                                        else {
                                                            return res.status(400).json("Failure in updating address!");
                                                        }
                                                    })
                                                        .catch((error) => {
                                                        return res.status(500).json({ error });
                                                    });
                                                }
                                                else {
                                                    return res.status(400).json("Provide address Details!");
                                                }
                                            }
                                        })
                                            .catch((error) => {
                                            return res.status(500).json({ error: error });
                                        });
                                    })
                                        .catch((error) => {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("No SP found with this email!");
                                }
                            })
                                .catch((error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(404).json("No email found!");
                        }
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.changeUserPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.mySettingsService
                            .findUserByEmail(user.Email)
                            .then((user) => __awaiter(this, void 0, void 0, function* () {
                            if (user && user.UserTypeId === 2) {
                                const isOld = yield bcrypt_1.default.compare(req.body.OldPassword, user.Password);
                                if (!isOld) {
                                    return res.status(400).json("Incorrect Old Password!");
                                }
                                else {
                                    if (req.body.NewPassword !== req.body.ConfirmPassword) {
                                        return res.status(400).json("New Password & Confirm Password is not matching!");
                                    }
                                    else {
                                        req.body.NewPassword = yield bcrypt_1.default.hash(req.body.NewPassword, saltRouds);
                                        return this.mySettingsService
                                            .changePassword(user.Email, req.body.NewPassword)
                                            .then((password) => {
                                            return res.status(200).json("Password changed Successfully!");
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                }
                            }
                            else {
                                return res.status(404).json("SP not found!");
                            }
                        }))
                            .catch((error) => {
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.status(404).json("Token not exists!");
            }
        });
        this.mySettingsService = mySettingsService;
    }
}
exports.MySettingsController = MySettingsController;
