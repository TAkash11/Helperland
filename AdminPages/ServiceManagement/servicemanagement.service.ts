import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { ServiceManagementRepository } from "./servicemanagement.repository";


type service = {
    ServiceId: number | undefined,
    ServiceDate: Date,
    Duration: string
    CustomerDetails: {
        UserId: number,
        Name: string,
        Address: {
            StreetName: string | undefined,
            HouseNumber: string | undefined,
            City: string | undefined,
            PostalCode : number | undefined,
        }
    },
    ServiceProvider: {
        ServiceProviderId: number | null,
        Name: string | null,
        Ratings: number | null | undefined,
    },
    GrossAmount: string,
    NetAmount: string,
    Status: number | string | null,
};

export type filterData = {
    ServiceId: number | undefined,
    ZipCode: number | undefined,
    Status: number | string,
    HelperName: string | undefined,
    CustomerName: string,
    HasIssue: boolean | undefined,
    FromDate: Date,
    ToDate: Date,
    Email: string | undefined,
}

export class ServiceManagementService {
    public constructor(private readonly ServiceManagementRepository: ServiceManagementRepository) {
        this.ServiceManagementRepository = ServiceManagementRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.ServiceManagementRepository.findUser(Email);
    }

    public async findByServiceId(ServiceId: number): Promise<ServiceRequest | null> {
        return this.ServiceManagementRepository.findByServiceId(ServiceId);
    }

    public async findBySId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return this.ServiceManagementRepository.findBySId(ServiceRequestId);
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.ServiceManagementRepository.updateServiceStatus(ServiceId);
    }

    public async updateStatus(ServiceRequestId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.ServiceManagementRepository.updateStatus(ServiceRequestId);
    }

    public async updateAddress(ServiceRequestId: number, AddressLine1: string, AddressLine2: string, PostalCode: number, City: string): Promise<[number, ServiceRequestAddress[]] | [affectedCount: number]> {
        return this.ServiceManagementRepository.updateAddress(ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City);
    }
    
    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return this.ServiceManagementRepository.findByAllSPId(ServiceProviderId);
    }

    public async updateService(ServiceRequestId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.ServiceManagementRepository.updateService(ServiceRequestId, ServiceStartDate, ServiceStartTime);
    }

    public async findAllService(): Promise<service[]> {
        let details: service[] = [];
        const service = await this.ServiceManagementRepository.findAllService();
        for(let s in service) {
            const userdetails = await this.ServiceManagementRepository.findUserById(service[s].UserId!);
            const addressdetails = await this.ServiceManagementRepository.findAddressById(service[s].ServiceRequestId);
            const spdetails = await this.ServiceManagementRepository.findSPById(service[s].ServiceProviderId);
            const spRating = await this.ServiceManagementRepository.findSpRatings(service[s].ServiceRequestId);

            const Time = (service[s].ServiceHours);
            const Extra = (service[s].ExtraHours);
            const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
            const total = ((Time+Extra!).toString()).split('.');
            var time:string, Status, spId, spName, spAvatar, spRatings;
            if(StartTime[1] == "30"){
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])+1).toString())+":00";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":30";
                }
            }
            else{
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])).toString())+":30";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":00";
                } 
            }
            service[s].update({EndTime:time});

            if(service[s].Status === 1) {
                Status = 'Booked';
            }
            else if(service[s].Status === 2) {
                Status = 'Completed';
            }
            else if(service[s].Status === 3) {
                Status = 'Cancelled';
            }
            else if(service[s].Status === 4) {
                Status = 'Assigned';
            }
            else {
                Status = null;
            }

            if(spdetails) {
                spId = spdetails.UserId;
                spName = spdetails?.FirstName + " " + spdetails?.LastName;
                if(spRating) {
                    spRatings = spRating?.Ratings;
                }
                else {
                    spRatings = null;
                }
            }
            else {
                spId = null;
                spName = null;
                spAvatar = null;
            }
            await details.push({
                ServiceId: service[s].ServiceId,
                ServiceDate: service[s].ServiceStartDate,
                Duration: service[s].ServiceStartTime + " - " + time,
                CustomerDetails: {
                    UserId: userdetails?.UserId!,
                    Name: userdetails?.FirstName + " " + userdetails?.LastName,
                    Address: {
                        StreetName: addressdetails?.AddressLine1,
                        HouseNumber: addressdetails?.AddressLine2,
                        City: addressdetails?.City,
                        PostalCode: addressdetails?.PostalCode,
                    }
                },
                ServiceProvider: {
                    ServiceProviderId: spId,
                    Name: spName,
                    Ratings: spRatings
                },
                GrossAmount: service[s].TotalCost + " €",
                NetAmount: service[s].TotalCost + " €",
                Status: Status
            });
        }
        return details;
    }

    public async findService(service: service[], filters: filterData) {
        let services = await service.filter((x) => {
            return (!filters.ServiceId || (x.ServiceId && x.ServiceId === filters.ServiceId)) &&
                   (!filters.ZipCode || (x.CustomerDetails.Address.PostalCode && x.CustomerDetails.Address.PostalCode === filters.ZipCode)) &&
                   (!(filters.Status === 'Booked') || (x.Status === 'Booked' && x.Status === 'Booked')) &&
                   (!(filters.Status === 'Completed') || (x.Status === 'Completed' && x.Status === 'Completed')) &&
                   (!(filters.Status === 'Cancelled') || (x.Status === 'Cancelled' && x.Status === 'Cancelled')) &&
                   (!(filters.Status === 'Assigned') || (x.Status === 'Assigned' && x.Status === 'Assigned')) &&
                   (!filters.HelperName || (x.ServiceProvider.Name && x.ServiceProvider.Name === filters.HelperName)) &&
                   (!filters.CustomerName || (x.CustomerDetails.Name && x.CustomerDetails.Name === filters.CustomerName));
        });
        if(filters.FromDate) {
            if(services) {
                services = services.filter(x => {
                    const FromDate = new Date(filters.FromDate);
                    const ServiceDate = new Date(x.ServiceDate);
                    return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                });
            }
            else {
                services = service.filter(x => {
                    const FromDate = new Date(filters.FromDate);
                    const ServiceDate = new Date(x.ServiceDate);
                    return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                });
            }
        }
        if(filters.ToDate) {
            if(services) {
                services = services.filter(x => {
                    const ToDate = new Date(filters.ToDate);
                    const ServiceDate = new Date(x.ServiceDate);
                    return (!ToDate || (ServiceDate && ToDate.getTime()>= ServiceDate.getTime()));
                });
            }
            else {
                services = service.filter(x => {
                    const ToDate = new Date(filters.ToDate);
                    const ServiceDate = new Date(x.ServiceDate);
                    return (!ToDate || (ServiceDate && ToDate.getTime()>= ServiceDate.getTime()));
                });
            }
        }
        if(filters.Email) {
            const userbyEmail = await this.ServiceManagementRepository.findUser(filters.Email!);
            if(userbyEmail) {
                if(services) {
                    services = services.filter(x => {
                        return x.CustomerDetails.UserId === userbyEmail.UserId ||
                               x.ServiceProvider.ServiceProviderId === userbyEmail.UserId;
                    });
                }
                else {
                    services = service.filter(x => {
                        return x.CustomerDetails.UserId === userbyEmail.UserId ||
                               x.ServiceProvider.ServiceProviderId === userbyEmail.UserId;
                    });
                }
            }
            else {
                services = [];
            }
        }
        return services;
    }

    public cancleService(Email: string, ServiceId: number | undefined): typeof data{
        const data = {
            from: 'helperlandteam@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
            <html>
            <body>
            <h3>"Service Request of ServiceId ${ServiceId} is cancelled by Admin on behalf of customer."</h3>
            </body>
            </html>`
        }
        return data;
    }

    public async getEmails(service: ServiceRequest): Promise<string[]> {
        const email: string[] = [];
        const cust = await this.ServiceManagementRepository.findUserById(service.UserId!);
        const sp = await this.ServiceManagementRepository.findUserById(service.ServiceProviderId!);
        if(cust && service.UserId) {
            email.push(cust.Email);
        }
        if(sp && service.ServiceProviderId) {
            email.push(sp.Email);
        }
        return email;
    }

    public rescheduleWithAddress(ServiceStartDate: Date, ServiceStartTime: string, Email: string, ServiceId: number, AddressLine1: string, AddressLine2: string, PostalCode: number, City: string): typeof data{
        const data = {
            from: 'helperlandteam@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: `
                <!DOCTYPE>
                <html>
                <body>
                <p>Service Request of ServiceId <b>${ServiceId}</b> is rescheduled by Admin on behalf of customer.</p>
                <p>Service Request Details:</p>
                <p>New date: ${ServiceStartDate}.</p>
                <p>New time: ${ServiceStartTime}.</p>
                <p>New Address: ${AddressLine1}, ${AddressLine2}, ${City}, ${PostalCode}.</p>
                </body>
                </html>
                `
        }
        return data;
    }

    public SPHasFutureSameDateTime( ServiceStartDate: Date, ServiceRequest: ServiceRequest[], totalHour: number, ServiceStartTime: string, SId: number ) {
        let startDate;
        let startTime;
        let endTime;
        let ServiceId;
        const uTime = ServiceStartTime.split(":");
        if(uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        const updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        const enteredDate = new Date(ServiceStartDate);
        let isMatch;
        for(let s in ServiceRequest) {
            if(ServiceRequest[s].ServiceRequestId != SId){
            if(new Date(ServiceRequest[s].ServiceStartDate).getTime() > enteredDate.getTime()) {
                isMatch = false;
            }
            else if(new Date(ServiceRequest[s].ServiceStartDate).getTime() < enteredDate.getTime()) {
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
                    ServiceId = ServiceRequest[s].ServiceRequestId;
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
        }
        return { isMatch, startDate, startTime, endTime, ServiceId };
    }

}