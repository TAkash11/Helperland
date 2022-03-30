import express from "express";
import { celebrate } from "celebrate";

import { LoginRepository } from "../Login/login.repository";
import { LoginService } from "../Login/login.service";
import { LoginController } from "../Login/login.controller";

import { DashboardRepository } from "../CustomerPages/Dashboard/dashboard.repository";
import { DashboardSchema } from "../CustomerPages/Dashboard/dashboard.model";
import { DashboardService } from "../CustomerPages/Dashboard/dashboard.service";
import { DashboardController } from "../CustomerPages/Dashboard/dashboard.controller";

import { HistoryRepository } from "../CustomerPages/ServiceHistory/history.repository";
import { HistorySchema } from "../CustomerPages/ServiceHistory/history.model";
import { HistoryService } from "../CustomerPages/ServiceHistory/history.service";
import { HistoryController } from "../CustomerPages/ServiceHistory/history.controller";

import { SettingsRepository } from "../CustomerPages/MySettings/mysettings.repository";
import { SettingsSchema } from "../CustomerPages/MySettings/mysettings.model";
import { SettingsService } from "../CustomerPages/MySettings/mysettings.service"
import { SettingsController } from "../CustomerPages/MySettings/mysettings.controller"; 

const { reschedule, cancle } = DashboardSchema;
const { Ratings } = HistorySchema;
const { details, address, passwordChange } = SettingsSchema;

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const dashboardrepo: DashboardRepository = new DashboardRepository();
const dashboardservice: DashboardService = new DashboardService(dashboardrepo);
const dashboardcontroller: DashboardController = new DashboardController(dashboardservice);

const historyrepo: HistoryRepository = new HistoryRepository();
const historyservice: HistoryService = new HistoryService(historyrepo);
const historycontroller: HistoryController = new HistoryController(historyservice);

const settingsrepo: SettingsRepository = new SettingsRepository();
const settingsservice: SettingsService = new SettingsService(settingsrepo);
const settingscontroller: SettingsController = new SettingsController(settingsservice);

const router:express.Router = express.Router();

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
router.post('/RescheduleService/:ServiceId', loginController.validateToken, celebrate(reschedule), dashboardcontroller.rescheduleService, dashboardcontroller.rescheduleIfTimeSlotNotConflicts);
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
router.post('/cancleServicerequest/:ServiceId', loginController.validateToken, celebrate(cancle), dashboardcontroller.cancleServiceRequest);

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
router.post('/giveRatings/:ServiceRequestId', loginController.validateToken, celebrate(Ratings), historycontroller.giveRatings);

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

router.put('/UpdateUserDetails', loginController.validateToken, celebrate(details), settingscontroller.updateUserDetails);
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
router.put('/UpdateUserAddress/:Id', loginController.validateToken, celebrate(address), settingscontroller.updateUserAddress);
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
router.put('/UpdateUserPass', loginController.validateToken, celebrate(passwordChange), settingscontroller.changePassword);

export = router;