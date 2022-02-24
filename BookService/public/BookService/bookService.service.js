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
exports.BookService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class BookService {
    constructor(bookServiceRepository) {
        this.bookServiceRepository = bookServiceRepository;
        this.bookServiceRepository = bookServiceRepository;
    }
    getHelpers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getHelpers();
        });
    }
    getUserByEmail(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getUserByEmail(Email);
        });
    }
    getAddress(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getAddresses(userId);
        });
    }
    createUserAddress(userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createUserAddress(userAddress);
        });
    }
    createToken(Email, postalCode) {
        const token = jsonwebtoken_1.default.sign({ Email, postalCode }, process.env.SECRET_KEY, {
            expiresIn: "3h",
        });
        return token;
    }
    getHelperByZC(ZipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getHelperByZC(ZipCode);
        });
    }
    createService(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createService(serviceRequest);
        });
    }
    serviceRequest(Email) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created!</h2>
            <p>Logged in to your account to accept Service Request.</p>
            </body></html>`
        };
        return data;
    }
}
exports.BookService = BookService;
