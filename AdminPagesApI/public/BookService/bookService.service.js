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
    createService(serviceRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.createService(serviceRequest);
        });
    }
    getHelpersByZipCode(zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getHelpersByZipcode(zipCode);
        });
    }
    createToken(Email, postalCode) {
        const token = jsonwebtoken_1.default.sign({ Email, postalCode }, process.env.SECRET_KEY, {
            expiresIn: "3h",
        });
        return token;
    }
    serviceRequest(Email) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created!</h2>
            <p>Log in to your account to accept Service Request.</p>
            </body></html>`
        };
        return data;
    }
    // public async createFavoriteAndBlocked(fandb: {[key: number|string]:FavoriteAndBlocked}): Promise<FavoriteAndBlocked>{
    //   return this.bookServiceRepository.createFavoriteAndBlocked(fandb);
    // }
    getFavoriteAndBlocked(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookServiceRepository.getFavoriteAndBlocked(userId);
        });
    }
    getBlockedHelper(userId, helpers) {
        return __awaiter(this, void 0, void 0, function* () {
            const helperIds = [];
            for (let us in helpers) {
                helperIds.push(helpers[us].UserId);
            }
            return this.bookServiceRepository.getBlockedHelper(userId, helperIds);
        });
    }
    removeHelperBlockedLoginCustomer(userId, helpers) {
        return __awaiter(this, void 0, void 0, function* () {
            const helperIds = [];
            // console.log(helpers);
            for (let hp in helpers) {
                helperIds.push(helpers[hp].UserId);
            }
            const blockedCustomer = yield this.bookServiceRepository.getHelpersBlockedCustomer(userId, helperIds);
            // console.log(blockedCustomer);
            let filteredHelper = helpers.filter((sr) => {
                return !blockedCustomer.find((rm) => {
                    return (rm.UserId === sr.UserId);
                });
            });
            // console.log(filteredHelper);
            return filteredHelper;
        });
    }
    getEmailAddressForSendEmail(user, body) {
        let Email = [];
        for (let count in user) {
            Email.push(user[count].Email);
        }
        return Email;
    }
    removeBlockedHelper(user, blockedHelpers) {
        const users = user.filter((item) => {
            return blockedHelpers.every((f) => {
                return f.TargetUserId !== item.UserId;
            });
        });
        return users;
    }
}
exports.BookService = BookService;
