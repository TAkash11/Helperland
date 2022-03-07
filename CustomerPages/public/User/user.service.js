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
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.userRepository = userRepository;
    }
    getUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getUserByEmail(Email);
        });
    }
    ;
    CustomerSignup(User) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.CustomerSignup(User);
        });
    }
    ;
    HelperSignup(User) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.HelperSignup(User);
        });
    }
    ;
    updateUser(userIsregistered, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.updateUser(userIsregistered, userEmail);
        });
    }
    ;
    createData(Email, token) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Customer SignUp Confirmation',
            html: `<h2>Your Account has been created at helperland</h2>
            <a href="http://localhost:3000/helperland/activate/${token}">Please click here to activate you account</a>`
        };
        return data;
    }
    createToken(userEmail) {
        const token = jsonwebtoken_1.default.sign({ userEmail }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '1h' });
        return token;
    }
}
exports.UserService = UserService;
