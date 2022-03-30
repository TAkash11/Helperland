import express from "express";
import { celebrate } from "celebrate";

import { LoginRepository } from "../Login/login.repository";
import { LoginService } from "../Login/login.service"
import { LoginController } from "../Login/login.controller"

import { ServiceManagementRepository } from "../AdminPages/ServiceManagement/servicemanagement.repository";
import { ServiceManagementService } from "../AdminPages/ServiceManagement/servicemanagement.service";
import { ServiceManagementController } from "../AdminPages/ServiceManagement/servicemanagement.controller";
import { ServiceManagementSchema} from "../AdminPages/ServiceManagement/servicemanagement.model"

import { UserManagementRepository } from "../AdminPages/UserManagement/usermanagement.repository";
import { UserManagementService } from "../AdminPages/UserManagement/usermanagement.service";
import { UserManagementController } from "../AdminPages/UserManagement/usermanagement.controller";

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const usermanagementrepo: UserManagementRepository= new UserManagementRepository();
const usermanagementservice: UserManagementService = new UserManagementService(usermanagementrepo);
const usermanagementcontroller: UserManagementController = new UserManagementController(usermanagementservice);

const servicemanagementrepo: ServiceManagementRepository= new ServiceManagementRepository();
const servicemanagementservice: ServiceManagementService = new ServiceManagementService(servicemanagementrepo);
const servicemanagementcontroller: ServiceManagementController = new ServiceManagementController(servicemanagementservice);

const { RescheduleAdd } = ServiceManagementSchema;
const router:express.Router = express.Router();

/**
 * @swagger
 * definitions:
 *  ServiceFilter:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: ServiceId of Service Request
 *     example: 1753
 *    ZipCode:
 *     type: integer
 *     description: ZipCode of Service Request
 *     example: 380021
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'customer@yopmail.com'
 *    CustomerName:
 *     type: string
 *     description: Customer Name
 *     example: 'Customer 1'
 *    HelperName:
 *     type: string
 *     description: Helper Name
 *     example: 'Darshan Diwan'
 *    Status:
 *     type: string
 *     description: Status of Service Request
 *     example: 'Completed'
 *    HasIssue:
 *     type: boolean
 *     description: Has Issue
 *     example: true
 *    FromDate:
 *     type: date
 *     descript: FromDate
 *     example: '2022-03-10'
 *    ToDate:
 *     type: date
 *     descript: ToDate
 *     example: '2022-03-20'
 *  Reschedule:
 *   type: object
 *   properties: 
 *    ServiceStartDate:
 *     type: date
 *     description: Service Start Date
 *     example: "2022-03-30"
 *    ServiceStartTime:
 *     type: string
 *     description: Service Start Time
 *     example: "11:00:00" 
 *    Address:
 *     type: object
 *     properties:
 *      AddressLine1:
 *       type: string
 *       description: address line 1
 *       example: '14/303'
 *      AddressLine2:
 *       type: string
 *       description: address line 2
 *       example: 'Satyam Nagar'
 *      PostalCode:
 *       type: integer
 *       description: Postal Code
 *       example: 380021
 *      City:
 *       type: string
 *       description: City
 *       example: 'Ahmedabad'
 */

/**
 * @swagger
 * /admin/getallRequests:
 *  post:
 *   summary: Admin Service Requests Screen
 *   description: Admin Service Requests Screen
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceFilter'
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
router.get('/admin/getallRequests', loginController.validateToken, servicemanagementcontroller.serviceRequests);

/**
 * @swagger
 * /admin/reschedule/{ServiceRequestId}:
 *  post:
 *   summary: Reschedule Service Request
 *   description: Reschedule Service Request
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
 *       $ref: '#/definitions/Reschedule'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.post('/admin/reschedule/:ServiceRequestId', celebrate(RescheduleAdd), loginController.validateToken, servicemanagementcontroller.rescheduleIfTimeSlotNotConflicts, servicemanagementcontroller.RescheduleWithAddress);

/**
 * @swagger
 * /admin/cancel/{ServiceId}:
 *  delete:
 *   summary: Cancle Service Request
 *   description: Cancle Service Request
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
router.delete('/admin/cancel/:ServiceId', loginController.validateToken, servicemanagementcontroller.cancleServiceRequest);

/**
 * @swagger
 * admin/getallUsers:
 *  post:
 *   summary: Get All Users
 *   description: Get All Users
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
router.get('/admin/getallUsers', loginController.validateToken, usermanagementcontroller.getAllUsers);


/**
 * @swagger
 * /admin/ActivateDeactivateuser/{UserId}:
 *  put:
 *   summary: Actiate-Deactivate Users
 *   description: Actiate-Deactivate Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Activate'  
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.put('/admin/ActivateDeactivateuser/:UserId', loginController.validateToken, usermanagementcontroller.updateUserStatus);


export = router;