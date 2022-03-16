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
            return this.serviceHistoryService.getServiceRequestHistoryOfHelper(parseInt(req.body.userId))
                .then((requestHistory) => __awaiter(this, void 0, void 0, function* () {
                console.log(requestHistory);
                if (requestHistory) {
                    if (requestHistory.length > 0) {
                        const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
                        if (requestHistory.length > 0) {
                            const historyData = yield this.serviceHistoryService.gethistoryForDisplay(pastDateHistory);
                            if (historyData.length > 0) {
                                return res.status(200).json(historyData);
                            }
                            else {
                                return res.status(404).json({ message: 'Service request history not found in past' });
                            }
                        }
                        else {
                            return res.status(404).json({ message: 'Service request history not found in past' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'Service request history not found' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'Service request not found' });
                }
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    error: error,
                });
            });
        });
        this.getServiceRequestDetailById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const Id = parseInt(req.params.id);
            if (req.body.userTypeId === 3) {
                return this.serviceHistoryService
                    .getServiceRequestDetailById(Id)
                    .then((serviceRequestDetail) => {
                    if ((serviceRequestDetail === null || serviceRequestDetail === void 0 ? void 0 : serviceRequestDetail.ServiceProviderId) === req.body.userId) {
                        return res.status(200).json(serviceRequestDetail);
                    }
                    else {
                        return res.status(404).json({
                            message: "No service request detail found for this request",
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        error: error,
                    });
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.exportDataInExcelFormat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let exportHistory = [];
            return this.serviceHistoryService.getServiceRequestHistoryOfHelper(parseInt(req.body.userId))
                .then((requestHistory) => __awaiter(this, void 0, void 0, function* () {
                if (requestHistory) {
                    if (requestHistory.length > 0) {
                        const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
                        if (requestHistory.length > 0) {
                            exportHistory = yield this.serviceHistoryService.getDatForExport(pastDateHistory);
                            let workbook = new exceljs_1.default.Workbook();
                            let worksheet = workbook.addWorksheet("history");
                            worksheet.columns = [
                                { header: "ServiceId", key: "ServiceId", width: 25 },
                                { header: "StartDate", key: "StartDate", width: 25 },
                                { header: "Customer", key: "Customer", width: 25 },
                                { header: "Payment", key: "Payment", width: 10 },
                            ];
                            worksheet.addRows(exportHistory);
                            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                            res.setHeader("Content-Disposition", "attachment; filename=" + "history.xlsx");
                            return workbook.xlsx.write(res).then(function (err) {
                                res.status(200).end();
                            });
                        }
                        else {
                            return res.status(404).json({ message: 'No data to export' });
                        }
                    }
                    else {
                        return res.status(404).json({ message: 'No data to export' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'No data to export' });
                }
            }))
                .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
            });
        });
        this.displayRatingsOfHelper = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.userTypeId === 3 && req.body.userId) {
                return this.serviceHistoryService.getRatingsOfHelper(req.body.userId)
                    .then((ratings) => __awaiter(this, void 0, void 0, function* () {
                    if (ratings) {
                        const displaydate = yield this.serviceHistoryService.getRatingsForDisplay(ratings);
                        if (displaydate.length > 0) {
                            return res.status(200).json(displaydate);
                        }
                        else {
                            return res.status(404).json({ message: "data not found" });
                        }
                    }
                    else {
                        return res.status(404).json({ message: "ratings not found" });
                    }
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
            }
            else {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        });
        this.serviceHistoryService = serviceHistoryService;
    }
}
exports.ServiceHistoryController = ServiceHistoryController;
