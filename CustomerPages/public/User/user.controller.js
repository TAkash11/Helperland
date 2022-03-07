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
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
const saltRounds = 10;
class UserController {
    constructor(UserService) {
        this.UserService = UserService;
        this.CustomerSignup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const isequal = req.body.Password === req.body.ConfirmPassword;
            if (!isequal) {
                return res.status(401).json("Enter same Password in Both fields");
            }
            else {
                return this.UserService
                    .getUserByEmail(req.body.Email)
                    .then((User) => __awaiter(this, void 0, void 0, function* () {
                    if (!User) {
                        req.body.Password = yield bcrypt_1.default.hash(req.body.Password, saltRounds);
                        return this.UserService
                            .CustomerSignup(req.body)
                            .then((User) => {
                            const token = this.UserService.createToken(User.Email);
                            const data = this.UserService.createData(User.Email, token);
                            mg.messages().send(data, function (error, body) {
                                if (error) {
                                    return res.status(303).json({
                                        error: error.message
                                    });
                                }
                            });
                            return res.status(200).json({
                                message: "Email successfully sent, kindly active your account",
                            });
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(401).json("User Exist!! Login!!");
                    }
                }))
                    .catch((error) => {
                    return res.status(500).json({ error: error });
                });
            }
        });
        this.HelperSignup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const isequal = req.body.Password === req.body.ConfirmPassword;
            if (!isequal) {
                return res.status(401).json("Enter same Password in Both fields");
            }
            else {
                return this.UserService
                    .getUserByEmail(req.body.Email)
                    .then((User) => __awaiter(this, void 0, void 0, function* () {
                    if (!User) {
                        req.body.Password = yield bcrypt_1.default.hash(req.body.Password, saltRounds);
                        return this.UserService
                            .HelperSignup(req.body)
                            .then((User) => {
                            const token = this.UserService.createToken(User.Email);
                            const data = this.UserService.createData(User.Email, token);
                            mg.messages().send(data, function (error, body) {
                                if (error) {
                                    return res.json({
                                        error: error.message,
                                    });
                                }
                            });
                            return res.status(200).json({
                                message: "Email successfully sent, kindly active your account",
                            });
                        })
                            .catch((error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(401).json("User Exist!! Login!!");
                    }
                }))
                    .catch((error) => {
                    return res.status(500).json({ error: error });
                });
            }
        });
        this.activateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_ACC_ACTIVATE, (error, decodedToken) => {
                    if (error) {
                        return res.status(400).json({ error: "Incorrect or Expired link" });
                    }
                    const { userEmail } = decodedToken;
                    if (userEmail) {
                        return this.UserService
                            .getUserByEmail(userEmail)
                            .then((user) => {
                            if (user) {
                                user.IsRegisteredUser = true;
                                return this.UserService
                                    .updateUser(user.IsRegisteredUser, user.Email)
                                    .then((user) => {
                                    return res.status(200)
                                        .json({ message: "You are now successfully registered", user });
                                })
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json(error);
                                });
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json(error);
                        });
                    }
                });
            }
            else {
                return res.json({ error: "Something went wrong!!!" });
            }
        });
        this.UserService = UserService;
    }
    ;
}
exports.UserController = UserController;
