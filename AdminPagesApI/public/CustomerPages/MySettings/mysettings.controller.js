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
exports.SettingsController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const saltRouds = 10;
class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
        this.updateUserDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        const { Email } = user;
                        if (Email) {
                            const UserEmail = Email;
                            const FirstName = req.body.FirstName;
                            const LastName = req.body.LastName;
                            const Mobile = req.body.Mobile;
                            const DateOfBirth = req.body.DateOfBirth;
                            return this.settingsService
                                .findUserByEmail(Email)
                                .then((findUser) => {
                                if (findUser) {
                                    return this.settingsService
                                        .updateUserDetails(UserEmail, FirstName, LastName, Mobile, DateOfBirth)
                                        .then((user) => {
                                        return res.status(200).json({
                                            FirstName: FirstName,
                                            LastName: LastName,
                                            Email: Email,
                                            Mobile: Mobile,
                                            DateOfBirth: DateOfBirth
                                        });
                                    })
                                        .catch((error) => {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("No user found with this email!");
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
        this.updateUserAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const AId = parseInt(req.params.Id);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        const { Email } = user;
                        if (Email) {
                            const AddressLine1 = req.body.AddressLine1;
                            const AddressLine2 = req.body.AddressLine2;
                            const City = req.body.City;
                            const State = req.body.State;
                            const PostalCode = req.body.PostalCode;
                            const Mobile = req.body.Mobile;
                            return this.settingsService
                                .findUserByEmail(Email)
                                .then((findUser) => {
                                if (findUser) {
                                    return this.settingsService
                                        .findByAddressId(AId)
                                        .then((id) => {
                                        console.log(id);
                                        if (id) {
                                            if (findUser.Email === id.Email) {
                                                return this.settingsService
                                                    .updateUserAddress(AId, AddressLine1, AddressLine2, City, State, PostalCode, Mobile)
                                                    .then((address) => {
                                                    return res.status(200).json({
                                                        Address: AddressLine1 + ', ' + AddressLine2 + ', ' + City + ', ' + State,
                                                        PhoneNumber: Mobile
                                                    });
                                                })
                                                    .catch((error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(404).json("Enter valid Id!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Id not found!");
                                        }
                                    })
                                        .catch((error) => {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("No user found with this email!");
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
        this.deleteAddress = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            const AId = parseInt(req.params.Id);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.settingsService
                            .findUserByEmail(user.Email)
                            .then((findUser) => {
                            if (findUser) {
                                return this.settingsService
                                    .findByAddressId(AId)
                                    .then((id) => {
                                    if (id) {
                                        if (findUser.Email === id.Email) {
                                            return this.settingsService
                                                .deleteAddress(AId)
                                                .then((address) => {
                                                return res.status(200).json("Address deleted Successfully!");
                                            })
                                                .catch((error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return res.status(404).json("Enter valid Id");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Id not found!");
                                    }
                                })
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("No user found with this email!");
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
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid login!");
                    }
                    else {
                        return this.settingsService
                            .findUserByEmail(user.Email)
                            .then((findUser) => __awaiter(this, void 0, void 0, function* () {
                            if (findUser) {
                                const isOld = bcrypt_1.default.compare(req.body.OldPassword, findUser.Password);
                                if (!isOld) {
                                    return res.status(400).json("Incorrect Old Password!");
                                }
                                else {
                                    if (req.body.OldPassword === req.body.NewPassword) {
                                        return res.status(400).json("Choose different password other than older one!");
                                    }
                                    else {
                                        if (req.body.NewPassword !== req.body.ConfirmPassword) {
                                            return res.status(400).json("New Password & Confirm Password is not matching!");
                                        }
                                    }
                                }
                                req.body.NewPassword = yield bcrypt_1.default.hash(req.body.NewPassword, saltRouds);
                                return this.settingsService
                                    .changePassword(user.Email, req.body.NewPassword)
                                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                                    return res.status(200).status(200).json("Password changed Successfully!");
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("User not exist!");
                            }
                        }))
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(404).json("Token not exists!");
            }
        });
        this.settingsService = settingsService;
    }
}
exports.SettingsController = SettingsController;
