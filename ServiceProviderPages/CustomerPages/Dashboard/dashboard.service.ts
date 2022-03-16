import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { DashboardRepository } from "./dashboard.repository";
import moment from "moment";
import { time } from "console";
import { Rating } from "../../models/rating";

export class DashboardService {
    public constructor(private readonly dashboardRepository: DashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.dashboardRepository.findUser(Email);
    }

    public async getAllFutureRequest(UserId: number): Promise<ServiceRequest[]> {
        return this.dashboardRepository.getAllFutureRequest(UserId);
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return this.dashboardRepository.getServiceById(ServiceId);
    }

    public async updateService(ServiceId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]]> {
        return this.dashboardRepository.updateService(ServiceId, ServiceStartDate, ServiceStartTime);
    }

    public compareDate(ServiceStartDate: Date) {
        const date1 = new Date(ServiceStartDate);
        const date2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
        console.log(date1);                            
        if(date1 > date2) {
            return true
        }
        else {
            return false;
        }
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return this.dashboardRepository.updateServiceStatus(ServiceId);
    }

    public async findSPById(UserId: number): Promise<User | null> {
        return this.dashboardRepository.findSPById(UserId);
    }

    public cancleService(Email: string, ServiceId: number | undefined, Reason: string): typeof data{
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
        }
        return data;
    }

    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return this.dashboardRepository.findByAllSPId(ServiceProviderId);
    }

    public SPHasFutureSameDateTime( ServiceStartDate: Date, ServiceRequest: ServiceRequest[], totalHour: number, ServiceStartTime: string ) {
        let startDate;
        let startTime;
        let endTime;
        const uTime = ServiceStartTime.split(":");
        if(uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        const updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        const enteredDate = new Date(ServiceStartDate);
        let isMatch;
        for(let s in ServiceRequest) {
            if(new Date(ServiceRequest[s].ServiceStartDate) > enteredDate) {
                isMatch = false;
            }
            else if(new Date(ServiceRequest[s].ServiceStartDate) < enteredDate) {
                isMatch = false;
            }
            else {
                const time = ServiceRequest[s].ServiceStartTime.toString().split(":");
                if(time[1] === '30') {
                    time[1] = '0.5';
                }
                const availableTime = parseFloat(time[0]) + parseFloat(time[1]);
                const availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours!;
                if(updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                    isMatch = false;
                }
                else {
                    startDate = ServiceRequest[s].ServiceStartDate;
                     const srTime = availableTime.toString().split('.');
                     if(srTime[1] === '5') {
                         srTime[1] = '30'
                     }
                     else {
                         srTime[1] = '00'
                     }
                     startTime = srTime.join(':');

                     const eTime = (availableTime + availableHour).toString().split('.');
                     if(parseInt(eTime[1]) === 5) {
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

    public rescheduleService(ServiceStartDate: Date, ServiceStartTime: string, Email: string, ServiceId: number): typeof data{
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
        }
        return data;
    };
    
}