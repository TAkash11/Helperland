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
exports.BookServiceController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
let email = [];
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class BookServiceController {
    constructor(bookService) {
        this.bookService = bookService;
        this.CheckAvailibility = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.bookService
                .getHelpers()
                .then((helpers) => {
                let isAvailable;
                if (helpers) {
                    for (let zc in helpers) {
                        if (helpers[zc].ZipCode === req.body.postalcode) {
                            isAvailable = true;
                        }
                    }
                    if (isAvailable) {
                        jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET_KEY, (err, user) => {
                            if (err) {
                                return res
                                    .status(401)
                                    .json({ message: "invalid or expired token" });
                            }
                            else {
                                const userEmail = user.Email;
                                const postalCode = req.body.postalcode;
                                console.log(userEmail);
                                const token = this.bookService.createToken(userEmail, postalCode);
                                return res
                                    .status(200)
                                    .cookie("token", token, { httpOnly: true });
                            }
                        });
                        return res.status(200).json({ message: "found" });
                    }
                    else {
                        return res.status(404).json({
                            message: "No ServiceProvider is available for this area.",
                        });
                    }
                }
                else {
                    return res.status(301).json({ message: "No helper found" });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.getUserAddresses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let address = [];
            if (req.headers.authorization) {
                jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "invalid or expired token" });
                    }
                    else {
                        return this.bookService
                            .getUserByEmail(user.Email)
                            .then((userByEmail) => {
                            if (userByEmail) {
                                return this.bookService
                                    .getAddress(userByEmail.UserId)
                                    .then((users) => {
                                    if (users.length > 0) {
                                        for (let us in users) {
                                            if (users[us].PostalCode === user.postalCode) {
                                                address.push(users[us]);
                                            }
                                        }
                                        if (address.length > 0) {
                                            return res.status(200).json(address);
                                        }
                                        else {
                                            return res
                                                .status(401)
                                                .json({ message: "Addresses not found" });
                                        }
                                    }
                                    else {
                                        return res
                                            .status(401)
                                            .json({ message: "User Addresses not found" });
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
                                return res.status(301).json("user not fund");
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        });
                    }
                });
            }
            else {
                return res.status(401).json({ message: "invalid or expired token" });
            }
        });
        this.createUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.headers.authorization) {
                jsonwebtoken_1.default.verify(req.headers.authorization, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "invalid or expired token" });
                    }
                    else {
                        req.body.Email = user.Email;
                        req.body.PostalCode = user.postalCode;
                        return this.bookService
                            .getUserByEmail(user.Email)
                            .then((user) => {
                            if (user) {
                                req.body.UserId = user.UserId;
                                req.body.UserTypeId = user.UserTypeId;
                                return this.bookService
                                    .createUserAddress(req.body)
                                    .then((address) => {
                                    return res.status(200).json({ message: "Address created successfully" });
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({
                                        error: error,
                                    });
                                });
                            }
                            else {
                                return res.status(404).json({ message: "user not found" });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        });
                    }
                });
            }
        });
        this.decodeToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        req.body.ZipCode = user.postalCode;
                        req.body.Email = user.Email;
                        return this.bookService
                            .getUserByEmail(user.Email)
                            .then((user) => {
                            if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                next();
                            }
                            else {
                                return res.status(400).json("Login as Customer!");
                            }
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(400).json("Something wrong with Token");
            }
        });
        this.CreateService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            req.body.ServiceHourlyRate = 20;
            req.body.ExtraHours = req.body.ExtraService.length * 0.5;
            req.body.SubTotal = req.body.ServiceHourlyRate * req.body.ServiceHours;
            req.body.TotalCost = req.body.ExtraService.length * 10 + req.body.SubTotal;
            req.body.ServiceRequestAddress.Email = req.body.Email;
            return this.bookService
                .getUserByEmail(req.body.Email)
                .then((user) => {
                if (user) {
                    if (user.UserTypeId === 1) {
                        req.body.UserId = user.UserId;
                        req.body.ModifiedBy = user.UserId;
                    }
                    else {
                        return res.status(401).json({ message: "unauthorised user" });
                    }
                }
                else {
                    return res.status(404).json("User not found");
                }
                return this.bookService
                    .createService(req.body)
                    .then((request) => {
                    if (request) {
                        return this.bookService
                            .getHelpersByZipCode(req.body.ZipCode)
                            .then((user) => __awaiter(this, void 0, void 0, function* () {
                            if (user.length > 0) {
                                for (let count in user) {
                                    email.push(user[count].Email);
                                }
                                for (let e in email) {
                                    console.log(email[e]);
                                    const data = yield this.bookService.serviceRequest(email[e]);
                                    yield mg.messages().send(data, function (error, body) {
                                        if (error) {
                                            return res.json({
                                                error: error.message,
                                            });
                                        }
                                    });
                                }
                                return res
                                    .status(200)
                                    .json({ message: "service book successfully" });
                            }
                            else {
                                return res.status(404).json({ message: "user not found" });
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({
                                error: error,
                            });
                        });
                    }
                    else {
                        return res.status(500).json({ message: "error" });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        error: error,
                    });
                });
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.bookService = bookService;
    }
}
exports.BookServiceController = BookServiceController;
