"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const NewServiceRequest_repository_1 = require("../ServiceProviderPages/NewServiceRequest/NewServiceRequest.repository");
const NewServiceRequest_service_1 = require("../ServiceProviderPages/NewServiceRequest/NewServiceRequest.service");
const NewServiceRequest_controller_1 = require("../ServiceProviderPages/NewServiceRequest/NewServiceRequest.controller");
const UpcomingServiceRequest_repository_1 = require("../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.repository");
const UpcomingServiceRequest_service_1 = require("../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.service");
const UpcomingServiceRequest_controller_1 = require("../ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.controller");
const ServiceHistory_repository_1 = require("../ServiceProviderPages/ServiceHistory/ServiceHistory.repository");
const ServiceHistory_controller_1 = require("../ServiceProviderPages/ServiceHistory/ServiceHistory.controller");
const ServiceHistory_service_1 = require("../ServiceProviderPages/ServiceHistory/ServiceHistory.service");
const BlockCustomer_repository_1 = require("../ServiceProviderPages/BlockCustomer/BlockCustomer.repository");
const BlockCustomer_service_1 = require("../ServiceProviderPages/BlockCustomer/BlockCustomer.service");
const BlockCustomer_controller_1 = require("../ServiceProviderPages/BlockCustomer/BlockCustomer.controller");
const BlockCustomer_model_1 = require("../ServiceProviderPages/BlockCustomer/BlockCustomer.model");
const MySettings_repository_1 = require("../ServiceProviderPages/MySettings/MySettings.repository");
const MySettings_service_1 = require("../ServiceProviderPages/MySettings/MySettings.service");
const MySettings_controller_1 = require("../ServiceProviderPages/MySettings/MySettings.controller");
const MySettings_model_1 = require("../ServiceProviderPages/MySettings/MySettings.model");
const { UpdateUser, ChangePassword } = MySettings_model_1.MySettingsSchema;
const { Blocked } = BlockCustomer_model_1.BlockCustomerSchema;
const loginRepo = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepo);
const loginController = new login_controller_1.LoginController(loginService);
const serviceRequestRepo = new NewServiceRequest_repository_1.ServiceRequestRepository();
const serviceRequestService = new NewServiceRequest_service_1.ServiceRequestService(serviceRequestRepo);
const serviceRequestController = new NewServiceRequest_controller_1.ServiceRequestController(serviceRequestService);
const upcomingServiceRepo = new UpcomingServiceRequest_repository_1.UpcomingServicesRepository();
const upcomingService = new UpcomingServiceRequest_service_1.UpcomingService(upcomingServiceRepo);
const upcomingServiceController = new UpcomingServiceRequest_controller_1.UpcomingServiceController(upcomingService);
const serviceHistoryRepo = new ServiceHistory_repository_1.ServiceHistoryRepository();
const serviceHistoryService = new ServiceHistory_service_1.ServiceHistoryService(serviceHistoryRepo);
const serviceHistoryController = new ServiceHistory_controller_1.ServiceHistoryController(serviceHistoryService);
const blockCustomerRepo = new BlockCustomer_repository_1.BlockCustomerRepository();
const blockCustomerService = new BlockCustomer_service_1.BlockCustomerService(blockCustomerRepo);
const blockCustomerController = new BlockCustomer_controller_1.BlockCustomerController(blockCustomerService);
const mySettingsRepo = new MySettings_repository_1.MySettingsRepository();
const mySettingsService = new MySettings_service_1.MySettingsService(mySettingsRepo);
const mySettingsController = new MySettings_controller_1.MySettingsController(mySettingsService);
const router = express_1.default.Router();
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
router.put("/BlockCustomer/:userId", loginController.validateToken, (0, celebrate_1.celebrate)(Blocked), blockCustomerController.addCustomerInBlockList);
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
router.put("/UpdateMyDetails", (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById);
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
router.put("/changePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);
module.exports = router;
