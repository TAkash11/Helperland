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
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginService {
    constructor(loginRepository) {
        this.loginRepository = loginRepository;
        this.loginRepository = loginRepository;
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loginRepository.getUserByEmail(userEmail);
        });
    }
    isApprovedUser(user) {
        return user.IsApprovedUser;
    }
    // public async comparePassword(enteredPassword:string,Password:string):Promise<boolean>{
    //   const same = await bcrypt.compare(enteredPassword, Password);
    //   return same;
    // }
    createToken(Email) {
        const token = jsonwebtoken_1.default.sign({ Email }, process.env.SECRET_KEY, { expiresIn: '2h' });
        return token;
    }
}
exports.LoginService = LoginService;
