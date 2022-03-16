import { Request, Response, RequestHandler } from "express";
import { ServiceRequestService } from "./NewServiceRequest.service";
import mailgun from "mailgun-js";


require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class ServiceRequestController {
  public constructor(private readonly serviceRequestService: ServiceRequestService) {
    this.serviceRequestService = serviceRequestService;
  }

  public getAllNewServiceRequests: RequestHandler = async (req, res): Promise<Response> => {
    if (req.body.userTypeId === 2) {
      if (req.body.userId) {
        return this.serviceRequestService
          .getHelperDetailbyId(req.body.userId)
          .then((helper) => {
            if (helper) {
              if (helper.ZipCode === null) {
                return res.status(404).json({
                  message:
                    "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area",
                });
              } else {
                return this.serviceRequestService
                  .getAllPendingServiceRequestByZipcode(
                    helper.ZipCode!,
                    req.body.userId
                  )
                  .then(async (serviceRequests) => {
                    if (serviceRequests && serviceRequests.length>0) {
                      const sRequests =
                        await this.serviceRequestService.filterServiceRequestsCompatibleWithHelper(
                          req.body.PetsAtHome,
                          serviceRequests
                        );
                      if (sRequests && sRequests.length>0) {
                        const requestDetail =
                          await this.serviceRequestService.displayRequestDetail(
                            sRequests
                          );
                        return res.status(200).json(requestDetail);
                      } else {
                        return res
                          .status(404)
                          .json({ message: "service requests not found" });
                      }
                    } else {
                      return res
                        .status(404)
                        .json({ message: "service requests not found" });
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  });
              }
            } else {
              return res.status(404).json({ message: "helper not found" });
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
      } else {
        return res
          .status(422)
          .json({ message: "helperId not found in request body" });
      }
    } else {
      return res.status(401).json({ message: "unauthorised user" });
    }
  };

  public getServiceRequestDetailById: RequestHandler = async (req,res): Promise<Response> => {
    console.log(req.body);
    if (req.body.userTypeId === 2) {
      return this.serviceRequestService
        .getServiceRequestDetailById(req.params.requestId)
        .then((serviceRequestDetail) => {
          if (serviceRequestDetail) {
            return res.status(200).json(serviceRequestDetail);
          } else {
            return res
              .status(404)
              .json({ message: "request detail not available" });
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

  public acceptableNewServiceRequestOrNot: RequestHandler = async (req,res,next
  ): Promise<Response | void> => {
    if (req.params.requestId) {
      return this.serviceRequestService
        .getServiceRequestDetailById(req.params.requestId)
        .then((serviceRequest) => {
          if (serviceRequest) {
            return this.serviceRequestService
              .getAllServiceRequestsOfHelper(req.body.userId)
              .then(async (serviceRequests) => {
                req.body.totalHour =
                  serviceRequest.ExtraHours + serviceRequest.ServiceHours;
                if (serviceRequests) {
                  const { srId, matched } =
                    await this.serviceRequestService.FutureSameDateAndTime(
                      serviceRequest.ServiceStartDate,
                      serviceRequests,
                      req.body.totalHour,
                      serviceRequest.ServiceStartTime
                    );
                  if (matched) {
                    return res.status(422).json({
                      message:
                        "Another service request " +
                        srId +
                        " has already been assigned which has time overlap with this service request. You can’t pick this one!",
                    });
                  } else {
                    next();
                  }
                } else {
                  next();
                }
              })
              .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          } else {
            return res.status(422).json({
              message:
                "This service request is no more available. It has been assigned to another provider",
            });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    } else {
      return res
        .status(400)
        .json({ message: "proper input not found in request" });
    }
  };

  public acceptNewServiceRequest: RequestHandler = async (
    req,
    res
  ): Promise<Response> => {
    return this.serviceRequestService
      .acceptNewServiceRequest(req.params.requestId, req.body.userId)
      .then((updatedServiceRequest) => {
        if (updatedServiceRequest[0] === 1) {
          return this.serviceRequestService
            .getHelpersByZipCode(req.body.ZipCode)
            .then((helpers) => {
              if (helpers) {
                for (let hp in helpers) {
                  if (helpers[hp].Email === req.body.email) {
                    continue;
                  }
                  const data = this.serviceRequestService.createData(
                    helpers[hp].Email!,
                    req.params.requestId!
                  );
                  console.log(data);
                  mg.messages().send(data, (error, body) => {
                    if (error) {
                      return res.json({ error: error.message });
                    }
                  });
                }
              }
              return res
                .status(200)
                .json({ message: "service request accepted successfully" });
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        } else {
          return res
            .status(404)
            .json({ message: "error in accepting service request" });
        }
      })
      .catch((error: Error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      });
  };
}