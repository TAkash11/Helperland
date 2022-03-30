"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const login_repository_1 = require("../Login/login.repository");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const servicemanagement_repository_1 = require("../AdminPages/ServiceManagement/servicemanagement.repository");
const servicemanagement_service_1 = require("../AdminPages/ServiceManagement/servicemanagement.service");
const servicemanagement_controller_1 = require("../AdminPages/ServiceManagement/servicemanagement.controller");
const servicemanagement_model_1 = require("../AdminPages/ServiceManagement/servicemanagement.model");
const usermanagement_repository_1 = require("../AdminPages/UserManagement/usermanagement.repository");
const usermanagement_service_1 = require("../AdminPages/UserManagement/usermanagement.service");
const usermanagement_controller_1 = require("../AdminPages/UserManagement/usermanagement.controller");
const loginRepo = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepo);
const loginController = new login_controller_1.LoginController(loginService);
const usermanagementrepo = new usermanagement_repository_1.UserManagementRepository();
const usermanagementservice = new usermanagement_service_1.UserManagementService(usermanagementrepo);
const usermanagementcontroller = new usermanagement_controller_1.UserManagementController(usermanagementservice);
const servicemanagementrepo = new servicemanagement_repository_1.ServiceManagementRepository();
const servicemanagementservice = new servicemanagement_service_1.ServiceManagementService(servicemanagementrepo);
const servicemanagementcontroller = new servicemanagement_controller_1.ServiceManagementController(servicemanagementservice);
const { RescheduleAdd } = servicemanagement_model_1.ServiceManagementSchema;
const router = express_1.default.Router();
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
router.post('/admin/reschedule/:ServiceRequestId', (0, celebrate_1.celebrate)(RescheduleAdd), loginController.validateToken, servicemanagementcontroller.rescheduleIfTimeSlotNotConflicts, servicemanagementcontroller.RescheduleWithAddress);
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
module.exports = router;
