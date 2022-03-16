import { Request, Response, RequestHandler } from "express";
import { ServiceHistoryService } from "./ServiceHistory.service";
import mailgun from "mailgun-js";
import exceljs from "exceljs";


require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceHistoryController {
  public constructor(private readonly serviceHistoryService: ServiceHistoryService) {
    this.serviceHistoryService = serviceHistoryService;
  }

  public getCompletedServiceRequest:RequestHandler = async(req, res):Promise<Response> => {
    return this.serviceHistoryService.getServiceRequestHistoryOfHelper(parseInt(req.body.userId))
    .then(async requestHistory => {
      console.log(requestHistory);
      if(requestHistory){
        if(requestHistory.length>0){
          const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
          if(requestHistory.length>0){
            const historyData = await this.serviceHistoryService.gethistoryForDisplay(pastDateHistory);
            if(historyData.length>0){
              return res.status(200).json(historyData);
            }else{
              return res.status(404).json({message:'Service request history not found in past'});
            }
          }else{
            return res.status(404).json({message:'Service request history not found in past'});
          }
        }else{
          return res.status(404).json({message:'Service request history not found'});
        }
      }else{
        return res.status(404).json({message:'Service request not found'});
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    });
  };


  public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response> => {
    console.log(req.body);
    const Id = parseInt(req.params.id);
    if (req.body.userTypeId === 3) {
      return this.serviceHistoryService
        .getServiceRequestDetailById(Id)
        .then((serviceRequestDetail) => {
          if (serviceRequestDetail?.ServiceProviderId === req.body.userId) {
            return res.status(200).json(serviceRequestDetail);
          } else {
            return res.status(404).json({
              message: "No service request detail found for this request",
            });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({
            error: error,
          });
        });
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public exportDataInExcelFormat:RequestHandler = async(req, res):Promise<Response|void> => {
    let exportHistory = [];
    return this.serviceHistoryService.getServiceRequestHistoryOfHelper(parseInt(req.body.userId))
    .then(async requestHistory => {
      if(requestHistory){
        if(requestHistory.length>0){
          const pastDateHistory = this.serviceHistoryService.compareDateWithCurrentDate(requestHistory);
          if(requestHistory.length>0){
            exportHistory = await this.serviceHistoryService.getDatForExport(pastDateHistory);
            let workbook = new exceljs.Workbook();
            let worksheet = workbook.addWorksheet("history");
            worksheet.columns = [
              { header: "ServiceId" ,   key: "ServiceId", width: 25 },
              { header: "StartDate" ,   key: "StartDate", width: 25 },
              { header: "Customer"  ,   key: "Customer" , width: 25 },
              { header: "Payment"   ,   key: "Payment"  , width: 10 },
            ];
            worksheet.addRows(exportHistory);
            res.setHeader(
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=" + "history.xlsx"
            ); 
            
            return workbook.xlsx.write(res).then(function (err) {
              res.status(200).end();
            });
          }else{
            return res.status(404).json({message:'No data to export'});
          }
        }else{
          return res.status(404).json({message:'No data to export'});
        }
      }else{
        return res.status(404).json({message:'No data to export'});
      }
    })
    .catch((error: Error) => {
      console.log(error);
      return res.status(500).json({error: error});
    });
  };

  public displayRatingsOfHelper:RequestHandler = async(req, res):Promise<Response> => {
    if (req.body.userTypeId === 3 && req.body.userId) {
      return this.serviceHistoryService.getRatingsOfHelper(req.body.userId)
      .then(async ratings => {
        if(ratings){
          const displaydate = await this.serviceHistoryService.getRatingsForDisplay(ratings);
          if(displaydate.length>0){
            return res.status(200).json(displaydate);
          }else{
            return res.status(404).json({ message: "data not found" });
          }
        }else{
          return res.status(404).json({ message: "ratings not found" });
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({error: error});
      });
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };
}