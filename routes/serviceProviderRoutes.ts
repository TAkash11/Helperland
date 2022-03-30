import express from "express";
import { celebrate } from "celebrate";

import { LoginRepository } from "../Login/login.repository";
import { LoginService } from "../Login/login.service";
import { LoginController } from "../Login/login.controller";

import { ServiceRequestRepository } from "../ServiceProviderPages/NewServiceRequest/NewServiceRequest.repository";
import { ServiceRequestService } from "../ServiceProviderPages/NewServiceRequest/NewServiceRequest.service";
import { ServiceRequestController } from "../ServiceProviderPages/NewServiceRequest/NewServiceRequest.controller";

import { UpcomingServicesRepository } from "../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.repository";
import { UpcomingService } from "../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.service"
import { UpcomingServiceController } from "../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.controller";

import { ServiceHistoryRepository } from "../ServiceProviderPages/ServiceHistory/ServiceHistory.repository";
import { ServiceHistoryController } from "../ServiceProviderPages/ServiceHistory/ServiceHistory.controller";
import { ServiceHistoryService } from "../ServiceProviderPages/ServiceHistory/ServiceHistory.service";

import { BlockCustomerRepository } from "../ServiceProviderPages/BlockCustomer/BlockCustomer.repository";
import { BlockCustomerService } from "../ServiceProviderPages/BlockCustomer/BlockCustomer.service";
import { BlockCustomerController } from "../ServiceProviderPages/BlockCustomer/BlockCustomer.controller";
import { BlockCustomerSchema } from "../ServiceProviderPages/BlockCustomer/BlockCustomer.model";

import { MySettingsRepository } from "../ServiceProviderPages/MySettings/MySettings.repository";
import { MySettingsService } from "../ServiceProviderPages/MySettings/MySettings.service";
import { MySettingsController } from "../ServiceProviderPages/MySettings/MySettings.controller";
import { MySettingsSchema } from "../ServiceProviderPages/MySettings/MySettings.model";

const { UpdateUser, ChangePassword } = MySettingsSchema;
const { Blocked } = BlockCustomerSchema;

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const serviceRequestRepo: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(serviceRequestRepo);
const serviceRequestController: ServiceRequestController =new ServiceRequestController(serviceRequestService);

const upcomingServiceRepo: UpcomingServicesRepository =new UpcomingServicesRepository();
const upcomingService: UpcomingService = new UpcomingService(upcomingServiceRepo);
const upcomingServiceController: UpcomingServiceController = new UpcomingServiceController(upcomingService);

const serviceHistoryRepo: ServiceHistoryRepository =new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(serviceHistoryRepo);
const serviceHistoryController: ServiceHistoryController = new ServiceHistoryController(serviceHistoryService);

const blockCustomerRepo: BlockCustomerRepository =new BlockCustomerRepository();
const blockCustomerService: BlockCustomerService = new BlockCustomerService(blockCustomerRepo);
const blockCustomerController: BlockCustomerController =new BlockCustomerController(blockCustomerService);

const mySettingsRepo: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(mySettingsRepo);
const mySettingsController: MySettingsController = new MySettingsController(mySettingsService);
const router:express.Router = express.Router();

/**
 * @swagger
 * /SPNewServiceRequests:
 *  get:
 *   summary: SP New Service Request
 *   description: SP New Service Request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/SPNewServiceRequests", loginController.validateToken, serviceRequestController.getAllNewServiceRequests);

/**
 * @swagger
 * /SPAcceptRequest/{ServiceId}:
 *  put:
 *   summary: Accept Service Request
 *   description: Accept Service Request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.put('/SPAcceptRequest/:ServiceId', loginController.validateToken, serviceRequestController.acceptableNewServiceRequestOrNot, serviceRequestController.acceptNewServiceRequest);

/**
 * @swagger
 * /ServiceRequestDetail/{ServiceId}:
 *  get:
 *   summary: SP New Service Request Pop Up
 *   description: SP New Service Request Pop Up
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get('/ServiceRequestDetail/:ServiceId', loginController.validateToken, serviceRequestController.getServiceRequestDetailById);

//Upcoming Services

/**
 * @swagger
 * /SPUpcomingServiceRequest:
 *  get:
 *   summary: SP Upcoming Service Request
 *   description: SP Upcoming Service Request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/SPUpcomingServiceRequest", loginController.validateToken, upcomingServiceController.getUpcomingServices);

/**
 * @swagger
 * /SPCancelServiceRequest/{ServiceId}:
 *  put:
 *   summary: Cancle Service by SP
 *   description: Cancle Service by SP
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put("/SPCancelServiceRequest/:ServiceId", loginController.validateToken, upcomingServiceController.cancelServiceRequest);

/**
 * @swagger
 * /SPCompleteServiceRequest/{ServiceId}:
 *  put:
 *   summary: Complete Service Requests
 *   description: Complete Service Requests
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.put("/SPCompleteServiceRequest/:ServiceId", loginController.validateToken, upcomingServiceController.completeServiceRequest);

/**
 * @swagger
 * /ServiceDetail/{ServiceId}:
 *  get:
 *   summary: SP Upcoming Service Pop up
 *   description: SP Upcoming Service Pop up
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/ServiceDetail/:ServiceId", loginController.validateToken, upcomingServiceController.getServiceRequestDetailById);

//Service History

/**
 * @swagger
 * /SPerviceRequestHistory:
 *  get:
 *   summary: Get SP Service History
 *   description: Get SP Service History
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/SPerviceRequestHistory", loginController.validateToken, serviceHistoryController.getCompletedServiceRequest);

/**
 * @swagger
 * /ServiceRequestHistoryDetail/{ServiceId}:
 *  get:
 *   summary: SP Service History Pop Up
 *   description: SP Service History Pop Up
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/ServiceRequestHistoryDetail/:ServiceId", loginController.validateToken, serviceHistoryController.getServiceRequestDetailById);

/**
 * @swagger
 * /ServiceRequestHistory/download:
 *  get:
 *   summary: Export SP Service History
 *   description: Export SP Service History
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/ServiceRequestHistory/download", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);

//Ratings
/**
 * @swagger
 * /SPratings:
 *  get:
 *   summary: Get SP Ratings
 *   description: Get SP Ratings
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/SPratings", loginController.validateToken, serviceHistoryController.displayRatingsOfHelper);

//Block Unblock Customer
/**
 * @swagger
 * /GetCustomerforHelper:
 *  get:
 *   summary: Get all customer SP had worked for
 *   description: Get all customer SP had worked for
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/GetCustomerforHelper", loginController.validateToken, blockCustomerController.getCustomerWorkedWithHelper);
/**
 * @swagger
 * /BlockCustomer/{custId}:
 *  post:
 *   summary: Create blocked customer
 *   description: Create blocked customer
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: custId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put("/BlockCustomer/:userId", loginController.validateToken, celebrate(Blocked), blockCustomerController.addCustomerInBlockList);

router.put("/unblockCustomer/:userId", loginController.validateToken, blockCustomerController.removeCustomerFromBlockList);

//My settings

/**
 * @swagger
 *  definitions:
 *   updateSP:
 *    type: object
 *    properties:
 *     FirstName:
 *      type: string
 *      description: First name of customer
 *      example: 'Akash'
 *     LastName:
 *      type: string
 *      description: Last name of customer
 *      example: 'Thakkar'
 *     Mobile:
 *      type: integer
 *      description: Mobile number of customer
 *      example: 9988776655
 *     DateOfBirth:
 *      type: date
 *      description: Date of Birth
 *      example: "2001-01-01"
 *     AddressLine1:
 *      type: string
 *      description: Street Name
 *      example: Kadam Flats
 *     AddressLine2:
 *      type: string
 *      description: House Number
 *      example: J4
 *     PostalCode:
 *      type: integer
 *      description: PostalCode
 *      example: 380021
 *     City:
 *      type: string
 *      description: City
 *      example: Ahmedabad
 *   changeSPPassword:
 *    type: object
 *    properties:
 *     OldPassword:
 *      type: string
 *      description: Old Password
 *      example: "1234"
 *     NewPassword:
 *      type: string
 *      description: New Password
 *      example: "2341"
 *     ConfirmPassword:
 *      type: string
 *      description: Confirm Password
 *      example: "2341" 
 */

/**
 * @swagger
 * /MyDetails:
 *  get:
 *   summary: Get SP Details
 *   description: Get SP Details
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get("/MyDetails", loginController.validateToken, mySettingsController.getUserDetailById);

/**
 * @swagger
 * /UpdateMyDetails:
 *  put:
 *   summary: Update SP details
 *   description: Update SP details
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody: 
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateSP'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put("/UpdateMyDetails", celebrate(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById);

//Change Password

/**
 * @swagger
 * /changePassword:
 *  put:
 *   summary: Change SP Password
 *   description: Change SP Password
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/changeSPPassword'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put("/changePassword", celebrate(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);


export = router;