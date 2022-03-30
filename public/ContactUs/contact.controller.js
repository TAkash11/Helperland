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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsController = void 0;
class ContactUsController {
    constructor(contactusService) {
        this.contactusService = contactusService;
        this.getall = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService
                .getall()
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.createUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const firstName = req.body.FirstName;
            const lastName = req.body.LastName;
            const Name = firstName + " " + lastName;
            req.body.Name = Name;
            req.body.UploadFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
            req.body.path = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
            console.log(req.body);
            return this.contactusService
                .createUsers(req.body)
                .then((user) => {
                return res.status(200).json({ user });
            })
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.contactusService.getUserById(+req.params.id)
                .then((user) => {
                if (user) {
                    return res.status(200).json({ user });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.contactusService = contactusService;
    }
}
exports.ContactUsController = ContactUsController;
