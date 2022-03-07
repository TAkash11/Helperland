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
exports.DashboardService = void 0;
const moment_1 = __importDefault(require("moment"));
class DashboardService {
    constructor(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardRepository = dashboardRepository;
    }
    findUser(Email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.findUser(Email);
        });
    }
    getAllFutureRequest(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getAllFutureRequest(UserId);
        });
    }
    getServiceById(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.getServiceById(ServiceId);
        });
    }
    updateService(ServiceId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.updateService(ServiceId, ServiceStartDate, ServiceStartTime);
        });
    }
    compareDate(ServiceStartDate) {
        const date1 = new Date(ServiceStartDate);
        const date2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        console.log(date1);
        if (date1 > date2) {
            return true;
        }
        else {
            return false;
        }
    }
    updateServiceStatus(ServiceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.updateServiceStatus(ServiceId);
        });
    }
    findSPById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.findSPById(UserId);
        });
    }
    cancleService(Email, ServiceId, Reason) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
            <html>
            <body>
            <h3>"Service Request assigned to you of ServiceId ${ServiceId} is cancelled by Customer due to this reason."</h3>
            <h3>Reason: ${Reason}.</h3>
            </body>
            </html>`
        };
        return data;
    }
    findByAllSPId(ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dashboardRepository.findByAllSPId(ServiceProviderId);
        });
    }
    SPHasFutureSameDateTime(ServiceStartDate, ServiceRequest, totalHour, ServiceStartTime) {
        let startDate;
        let startTime;
        let endTime;
        const uTime = ServiceStartTime.split(":");
        if (uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        const updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        const enteredDate = new Date(ServiceStartDate);
        let isMatch;
        for (let s in ServiceRequest) {
            if (new Date(ServiceRequest[s].ServiceStartDate) > enteredDate) {
                isMatch = false;
            }
            else if (new Date(ServiceRequest[s].ServiceStartDate) < enteredDate) {
                isMatch = false;
            }
            else {
                const time = ServiceRequest[s].ServiceStartTime.toString().split(":");
                if (time[1] === '30') {
                    time[1] = '0.5';
                }
                const availableTime = parseFloat(time[0]) + parseFloat(time[1]);
                const availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours;
                if (updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                    isMatch = false;
                }
                else {
                    startDate = ServiceRequest[s].ServiceStartDate;
                    const srTime = availableTime.toString().split('.');
                    if (srTime[1] === '5') {
                        srTime[1] = '30';
                    }
                    else {
                        srTime[1] = '00';
                    }
                    startTime = srTime.join(':');
                    const eTime = (availableTime + availableHour).toString().split('.');
                    if (parseInt(eTime[1]) === 5) {
                        eTime[1] = '30';
                    }
                    else {
                        eTime[1] = '00';
                    }
                    endTime = eTime.join(':');
                    isMatch = true;
                    break;
                }
            }
        }
        return { isMatch, startDate, startTime, endTime };
    }
    rescheduleService(ServiceStartDate, ServiceStartTime, Email, ServiceId) {
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: `
                <!DOCTYPE>
                <html>
                <body>
                <h3>"Service Request assigned to you of ServiceId ${ServiceId} is rescheduled by customer. New date and time are ${ServiceStartDate} ${ServiceStartTime}".</h3>
                </body>
                </html>
                `
        };
        return data;
    }
    ;
}
exports.DashboardService = DashboardService;
