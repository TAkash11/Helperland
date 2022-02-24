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
exports.ForgotController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
const saltRounds = 10;
class ForgotController {
    constructor(forgotService) {
        this.forgotService = forgotService;
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Email = req.body.Email;
            if (Email) {
                return this.forgotService
                    .getUserByEmail(Email)
                    .then((User) => {
                    if (!User) {
                        return res
                            .status(400)
                            .json({ message: "User with this email does not exist" });
                    }
                    const resetLink = this.forgotService.createToken(User.UserId);
                    const data = this.forgotService.createData(User.Email, resetLink);
                    mg.messages().send(data, function (error, body) {
                        if (error) {
                            return res.json({
                                error: error.message,
                            });
                        }
                    });
                    return res
                        .status(200)
                        .json({
                        message: "An email has been sent to your account. Click on the link in received email to reset the password",
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json(error);
                });
            }
            else {
                return res.status(400).json({ message: "Email does not exist" });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resetLink = req.body.resetLink;
            if (resetLink) {
                jsonwebtoken_1.default.verify(resetLink, process.env.FORGOT_PASSWORD, (error, decodedlink) => {
                    if (error) {
                        return res
                            .status(401)
                            .json({ message: "Incorrect or expired token" });
                    }
                    const userId = decodedlink.userId;
                    return this.forgotService
                        .getUserById(userId)
                        .then((user) => __awaiter(this, void 0, void 0, function* () {
                        if (!user) {
                            return res
                                .status(400)
                                .json({ error: "User with this token does not exist" });
                        }
                        const isSame = yield bcrypt_1.default.compare(req.body.newPassword, user.Password);
                        if (isSame) {
                            return res
                                .status(200)
                                .json({
                                message: "You used that password recently. Choose different password",
                            });
                        }
                        else {
                            user.Password = yield bcrypt_1.default.hash(req.body.newPassword, saltRounds);
                            return this.forgotService
                                .updateUser(user.Password, user.UserId)
                                .then((user) => {
                                return res
                                    .status(200)
                                    .json({ message: "password successfully changed", user });
                            })
                                .catch((error) => {
                                console.log(error);
                                return res.status(500).json(error);
                            });
                        }
                    }))
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json(error);
                    });
                });
            }
            else {
                return res.status(400).json({ message: "something went wrong" });
            }
        });
        this.forgotService = forgotService;
    }
}
exports.ForgotController = ForgotController;
