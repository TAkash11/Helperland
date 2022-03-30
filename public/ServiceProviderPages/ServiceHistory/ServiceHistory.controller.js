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
exports.ServiceHistoryController = void 0;
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const exceljs_1 = __importDefault(require("exceljs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
class ServiceHistoryController {
    constructor(serviceHistoryService) {
        this.serviceHistoryService = serviceHistoryService;
        this.getCompletedServiceRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceHistoryService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceHistoryService
                                    .getAllCompletedRequest(findUser.ZipCode)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    if (service && service.length > 0) {
                                        const serviceDetails = yield this.serviceHistoryService.serviceReq(service);
                                        if (serviceDetails.length > 0) {
                                            return res.status(200).json(serviceDetails);
                                        }
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No service exists!!!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not SP, Please login with you SP account!");
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
        this.getServiceRequestDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            const SId = parseInt(req.params.ServiceId);
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceHistoryService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceHistoryService
                                    .getServiceById(SId, findUser.ZipCode)
                                    .then((service) => __awaiter(this, void 0, void 0, function* () {
                                    let details = [];
                                    if (service) {
                                        const userdetails = yield this.serviceHistoryService.findUserById(service.UserId);
                                        const addressdetails = yield this.serviceHistoryService.findAddressById(service.ServiceRequestId);
                                        const extradetails = yield this.serviceHistoryService
                                            .findExtraById(service.ServiceRequestId)
                                            .then((extra) => {
                                            let ExtraService = [];
                                            if (extra) {
                                                for (var i = 0; i < extra.length; i++) {
                                                    const extras = extra[i].ServiceExtraId;
                                                    ExtraService.push(extras);
                                                }
                                                return ExtraService;
                                            }
                                        });
                                        const Time = (service.ServiceHours);
                                        const Extra = (service.ExtraHours);
                                        const StartTime = ((service.ServiceStartTime).toString().split(':'));
                                        const total = ((Time + Extra).toString()).split('.');
                                        var time;
                                        if (StartTime[1] == "30") {
                                            if (total[1] == '5') {
                                                time = (((+StartTime[0]) + (+total[0]) + 1).toString()) + ":00";
                                            }
                                            else {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                                            }
                                        }
                                        else {
                                            if (total[1] == '5') {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                                            }
                                            else {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":00";
                                            }
                                        }
                                        service.update({ EndTime: time });
                                        if (userdetails) {
                                            if (addressdetails) {
                                                yield details.push({
                                                    ServiceStartDate: service.ServiceStartDate,
                                                    ServiceTime: service.ServiceStartTime + " - " + time,
                                                    Duration: service.ServiceHours + service.ExtraHours,
                                                    ServiceID: service.ServiceId,
                                                    Extras: extradetails,
                                                    Payment: service.TotalCost + " €",
                                                    CustomerName: userdetails.FirstName + " " + userdetails.LastName,
                                                    ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                    Comments: service.Comments,
                                                });
                                            }
                                        }
                                        if (details.length > 0) {
                                            return res.status(200).json(details);
                                        }
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not SP, Please login with your SP account!");
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
        this.exportDataInExcelFormat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const SId = parseInt(req.params.ServiceId);
            let exportHistory = [];
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceHistoryService
                            .findUser(user.Email)
                            .then((findUser) => __awaiter(this, void 0, void 0, function* () {
                            if (findUser && findUser.UserTypeId === 2) {
                                this.serviceHistoryService
                                    .getAllCompletedRequest(findUser.ZipCode)
                                    .then((history) => __awaiter(this, void 0, void 0, function* () {
                                    if (history.length > 0) {
                                        const pastHistory = this.serviceHistoryService.compareDate(history);
                                        exportHistory = yield this.serviceHistoryService.Export(pastHistory);
                                        let workbook = new exceljs_1.default.Workbook();
                                        let worksheet = workbook.addWorksheet('Service History');
                                        worksheet.columns = [
                                            { header: 'Service Id', key: 'ServiceId', width: 10 },
                                            { header: 'Service Date', key: 'StartDate', width: 18 },
                                            { header: 'Duration', key: 'Duration', width: 18 },
                                            { header: 'Customer Name', key: 'CustomerName', width: 18 },
                                            { header: 'Customer Address Details', key: 'Address', width: 25 }
                                        ];
                                        worksheet.addRows(exportHistory);
                                        worksheet.getRow(1).eachCell((cell) => {
                                            cell.font = { bold: true };
                                        });
                                        workbook.xlsx.writeFile('SP_ServiceHistory_' + findUser.UserId + '.xlsx')
                                            .then((service) => {
                                            return res.status(200).json("Data exported successfully!");
                                        })
                                            .catch((error) => {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                    }
                                }))
                                    .catch((error) => {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("User not exists!");
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
                return res.status(400).json("Some error occurred!");
            }
        });
        this.displayRatingsOfHelper = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization || req.header('auth');
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, user) => {
                    if (error) {
                        return res.status(400).json("Invalid Login!");
                    }
                    else {
                        return this.serviceHistoryService
                            .findUser(user.Email)
                            .then((findUser) => {
                            if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                return this.serviceHistoryService
                                    .getAllRatings(findUser.UserId)
                                    .then((ratings) => __awaiter(this, void 0, void 0, function* () {
                                    if (ratings && ratings.length > 0) {
                                        const getAllRatings = yield this.serviceHistoryService.Ratings(ratings);
                                        if (getAllRatings.length > 0) {
                                            return res.status(200).json(getAllRatings);
                                        }
                                        else {
                                            return res.status(404).json("No ratings found!");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No rating exists!");
                                    }
                                }))
                                    .catch((error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(400).json("You are not SP, Please login with you SP account!");
                            }
                        })
                            .catch((error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                    }
                });
            }
            else {
                return res.status(400).json("Some error occurred!");
            }
        });
        this.serviceHistoryService = serviceHistoryService;
    }
}
exports.ServiceHistoryController = ServiceHistoryController;
