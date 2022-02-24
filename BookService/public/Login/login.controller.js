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
exports.LoginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.loginService
                .getUserByEmail(req.body.Email)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    const register = this.loginService.isApprovedUser(user);
                    if (register) {
                        const isSame = yield bcrypt_1.default.compare(req.body.Password, user.Password);
                        if (isSame) {
                            const token = this.loginService.createToken(user.Email);
                            if (user.UserTypeId === 1) {
                                return res
                                    .status(200)
                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                    .json({ message: "login successful user" });
                            }
                            else if (user.UserTypeId === 2) {
                                return res
                                    .status(200)
                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                    .json({ message: "login successful helper" });
                            }
                        }
                        return res
                            .status(401)
                            .json({ message: "Invalid Username or Password" });
                    }
                    return res.json({ message: "Active your account" });
                }
                return res
                    .status(401)
                    .json({ message: "Invalid Username or Password" });
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.validateToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token == null) {
                return res.status(401).json("You aren't logged in");
            }
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
                if (error) {
                    return res.status(400).json("Something Wrong");
                }
                const { Email } = decodedToken;
                if (Email) {
                    return this.loginService
                        .getUserByEmail(Email)
                        .then((user) => {
                        if (user === null) {
                            return res.status(404).json("User not found!");
                        }
                        else {
                            next();
                        }
                    })
                        .catch((error) => {
                        return res.status(500).json({ error });
                    });
                }
            });
        });
        this.loginService = loginService;
    }
}
exports.LoginController = LoginController;
