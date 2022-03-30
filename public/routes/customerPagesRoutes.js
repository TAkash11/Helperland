"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const dashboard_repository_1 = require("../CustomerPages/Dashboard/dashboard.repository");
const dashboard_model_1 = require("../CustomerPages/Dashboard/dashboard.model");
const dashboard_service_1 = require("../CustomerPages/Dashboard/dashboard.service");
const dashboard_controller_1 = require("../CustomerPages/Dashboard/dashboard.controller");
const history_repository_1 = require("../CustomerPages/ServiceHistory/history.repository");
const history_model_1 = require("../CustomerPages/ServiceHistory/history.model");
const history_service_1 = require("../CustomerPages/ServiceHistory/history.service");
const history_controller_1 = require("../CustomerPages/ServiceHistory/history.controller");
const mysettings_repository_1 = require("../CustomerPages/MySettings/mysettings.repository");
const mysettings_model_1 = require("../CustomerPages/MySettings/mysettings.model");
const mysettings_service_1 = require("../CustomerPages/MySettings/mysettings.service");
const mysettings_controller_1 = require("../CustomerPages/MySettings/mysettings.controller");
const { reschedule, cancle } = dashboard_model_1.DashboardSchema;
const { Ratings } = history_model_1.HistorySchema;
const { details, address, passwordChange } = mysettings_model_1.SettingsSchema;
const loginRepo = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepo);
const loginController = new login_controller_1.LoginController(loginService);
const dashboardrepo = new dashboard_repository_1.DashboardRepository();
const dashboardservice = new dashboard_service_1.DashboardService(dashboardrepo);
const dashboardcontroller = new dashboard_controller_1.DashboardController(dashboardservice);
const historyrepo = new history_repository_1.HistoryRepository();
const historyservice = new history_service_1.HistoryService(historyrepo);
const historycontroller = new history_controller_1.HistoryController(historyservice);
const settingsrepo = new mysettings_repository_1.SettingsRepository();
const settingsservice = new mysettings_service_1.SettingsService(settingsrepo);
const settingscontroller = new mysettings_controller_1.SettingsController(settingsservice);
const router = express_1.default.Router();
/**
 * @swagger
 * /FutureServicerequest:
 *  get:
 *   summary: Get Dashboard
 *   description: Get Dashboard
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
router.get('/FutureServicerequest', loginController.validateToken, dashboardcontroller.dashboard);
/**
 * @swagger
 * /FutureServicerequest/{ServiceId}:
 *  get:
 *   summary: Dashboard Service Pop up
 *   description: Dashboard Service Pop up
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
router.get('/FutureServicerequest/:ServiceId', loginController.validateToken, dashboardcontroller.getServiceById);
/**
 * @swagger
 *  definitions:
 *   Reschedule:
 *    type: object
 *    properties:
 *     ServiceStartDate:
 *      type: date
 *      description: Service Start Date
 *      example: "2022-03-13"
 *     ServiceStartTime:
 *      type: string
 *      description: Service Start Time
 *      example: "11:00"
 *   Cancle:
 *    type: object
 *    properties:
 *     Reason:
 *      type: string
 *      description: Reason for cancelling service
 *      example: "Reason"
 */
/**
 * @swagger
 * /RescheduleService/{ServiceId}:
 *  post:
 *   summary: Reschedule Service
 *   description: Reschedule Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reschedule'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.post('/RescheduleService/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(reschedule), dashboardcontroller.rescheduleService, dashboardcontroller.rescheduleIfTimeSlotNotConflicts);
/**
 * @swagger
 * /cancleServicerequest/{ServiceId}:
 *  post:
 *   summary: Cancle Service
 *   description: Cancle Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Cancle'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.post('/cancleServicerequest/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(cancle), dashboardcontroller.cancleServiceRequest);
/**
 * @swagger
 * /pastServicerequest:
 *  get:
 *   summary: Get Service History
 *   description: Get Service History
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
router.get('/pastServicerequest', loginController.validateToken, historycontroller.history);
/**
 * @swagger
 * /pastServicerequest/{ServiceId}:
 *  get:
 *   summary: Service History
 *   description: Service History
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
router.get('/pastServicerequest/:ServiceId', loginController.validateToken, historycontroller.getServiceById);
/**
 * @swagger
 *  definitions:
 *   Ratings:
 *    type: object
 *    properties:
 *     OnTimeArrival:
 *      type: float
 *      description: On Time Arrival
 *      example: 3.0
 *     Friendly:
 *      type: float
 *      description: Friendly
 *      example: 3.0
 *     QualityOfService:
 *      type: float
 *      description: Quality of Service
 *      example: 3.0
 *     Comments:
 *      type: string
 *      description: Comments
 *      example: "Very Good Behaviour"
 */
/**
 * @swagger
 * /giveRatings/{ServiceRequestId}:
 *  post:
 *   summary: Give Ratings
 *   description: Give Ratings
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceRequestId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.post('/giveRatings/:ServiceRequestId', loginController.validateToken, (0, celebrate_1.celebrate)(Ratings), historycontroller.giveRatings);
/**
 * @swagger
 *  definitions:
 *   updateCust:
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
 *      example: 9988242798
 *     DateOfBirth:
 *      type: date
 *      description: Date of Birth
 *      example: "2000-01-01"
 *   updateAddress:
 *    type: object
 *    properties:
 *     AddressLine1:
 *      type: string
 *      description: Address Line 1
 *      example: "Kadam Flats"
 *     AddressLine2:
 *      type: string
 *      description: Address Line 2
 *      example: "J4"
 *     City:
 *      type: string
 *      description: City
 *      example: "Ahmedabad"
 *     State:
 *      type: string
 *      description: State
 *      example: "Gujarat"
 *     Mobile:
 *      type: integer
 *      description: Mobile Number
 *      example: 9988242798
 *   changePassword:
 *    type: object
 *    properties:
 *     OldPassword:
 *      type: string
 *      description: Old Password
 *      example: "Aka876"
 *     NewPassword:
 *      type: string
 *      description: New Password
 *      example: "1234"
 *     ConfirmPassword:
 *      type: string
 *      description: Confirm Password
 *      example: "1234"
 */
/**
 * @swagger
 * /UpdateUserDetails:
 *  put:
 *   summary: Update Customer details
 *   description: Update Customer details
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateCust'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put('/UpdateUserDetails', loginController.validateToken, (0, celebrate_1.celebrate)(details), settingscontroller.updateUserDetails);
/**
 * @swagger
 * /UpdateUserAddress/{Id}:
 *  put:
 *   summary: Update User address
 *   description: Update User address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: AddressId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateAddress'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put('/UpdateUserAddress/:Id', loginController.validateToken, (0, celebrate_1.celebrate)(address), settingscontroller.updateUserAddress);
/**
 * @swagger
 * /DeleteAddress/{AddressId}:
 *  put:
 *   summary: Update User address
 *   description: Update User address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: AddressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.delete('/DeleteAddress/:Id', loginController.validateToken, settingscontroller.deleteAddress);
/**
 * @swagger
 * /UpdateUserPass:
 *  put:
 *   summary: Change User Password
 *   description: Change User Password
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/changePassword'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put('/UpdateUserPass', loginController.validateToken, (0, celebrate_1.celebrate)(passwordChange), settingscontroller.changePassword);
module.exports = router;
