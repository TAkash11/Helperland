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
exports.ForgotService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class ForgotService {
    constructor(forgotRepository) {
        this.forgotRepository = forgotRepository;
        this.forgotRepository = forgotRepository;
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forgotRepository.getUserByEmail(userEmail);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forgotRepository.getUserById(userId);
        });
    }
    createData(userEmail, token) {
        const data = {
            from: 'helperland-team@gmail.com',
            to: userEmail,
            subject: 'Reset Password link',
            html: `<h2>Please click here to activate you account</h2>
              <a href="http://localhost:3000/helperland/reset-password/${token}">Please click here to reset Password</a>`
        };
        return data;
    }
    createToken(userId) {
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.FORGOT_PASSWORD, { expiresIn: '30m' });
        return token;
    }
    updateUser(Password, UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forgotRepository.updateUser(Password, UserId);
        });
    }
}
exports.ForgotService = ForgotService;
