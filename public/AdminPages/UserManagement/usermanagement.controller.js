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
exports.UserManagementController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
class UserManagementController {
    constructor(userService) {
        this.userService = userService;
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.userService
                            .findUserByEmail(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                return this.userService
                                    .findAllUsers()
                                    .then((users) => __awaiter(this, void 0, void 0, function* () {
                                    if (users && users.length > 0) {
                                        return res.status(200).json(users);
                                    }
                                    else {
                                        return res.status(404).json("No user exists!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not Admin, Login Restricted!");
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
        this.updateUserStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const UId = parseInt(req.params.UserId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.userService
                            .findUserByEmail(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                return this.userService
                                    .findUser(UId)
                                    .then((userbyId) => {
                                    if (userbyId) {
                                        console.log(userbyId);
                                        if (userbyId.IsApprovedUser) {
                                            return this.userService
                                                .deactivateUser(userbyId.Email)
                                                .then((u) => {
                                                if (u) {
                                                    return res.status(200).json(`User ${userbyId.FirstName + " " + userbyId.LastName} deactivated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                                .catch((error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return this.userService
                                                .activateUser(userbyId.Email)
                                                .then((u) => {
                                                if (u) {
                                                    return res.status(200).json(`User ${userbyId.FirstName + " " + userbyId.LastName} activated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                                .catch((error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No user found with this Email");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not Admin, Login Restricted!");
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
        this.userService = userService;
    }
}
exports.UserManagementController = UserManagementController;
