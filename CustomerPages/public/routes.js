"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const user_repository_1 = require("./User/user.repository");
const user_service_1 = require("./User/user.service");
const user_controller_1 = require("./User/user.controller");
const login_repository_1 = require("./Login/login.repository");
const login_model_1 = require("./Login/login.model");
const login_service_1 = require("./Login/login.service");
const login_controller_1 = require("./Login/login.controller");
const forgotPassword_repository_1 = require("./ForgotPassword/forgotPassword.repository");
const forgotPassword_service_1 = require("./ForgotPassword/forgotPassword.service");
const forgotPassword_controller_1 = require("./ForgotPassword/forgotPassword.controller");
const forgotPassword_model_1 = require("./ForgotPassword/forgotPassword.model");
const bookService_repository_1 = require("./BookService/bookService.repository");
const bookService_controller_1 = require("./BookService/bookService.controller");
const bookService_service_1 = require("./BookService/bookService.service");
const bookService_model_1 = require("./BookService/bookService.model");
const dashboard_repository_1 = require("./CustomerPages/Dashboard/dashboard.repository");
const dashboard_model_1 = require("./CustomerPages/Dashboard/dashboard.model");
const dashboard_service_1 = require("./CustomerPages/Dashboard/dashboard.service");
const dashboard_controller_1 = require("./CustomerPages/Dashboard/dashboard.controller");
const history_repository_1 = require("./CustomerPages/ServiceHistory/history.repository");
const history_model_1 = require("./CustomerPages/ServiceHistory/history.model");
const history_service_1 = require("./CustomerPages/ServiceHistory/history.service");
const history_controller_1 = require("./CustomerPages/ServiceHistory/history.controller");
const mysettings_repository_1 = require("./CustomerPages/MySettings/mysettings.repository");
const mysettings_model_1 = require("./CustomerPages/MySettings/mysettings.model");
const mysettings_service_1 = require("./CustomerPages/MySettings/mysettings.service");
const mysettings_controller_1 = require("./CustomerPages/MySettings/mysettings.controller");
const { Login } = login_model_1.LoginSchema;
const { addPassword, Forgot } = forgotPassword_model_1.ResetSchema;
const { zipcode, UserAddress, CreateService } = bookService_model_1.BookServiceSchema;
const { reschedule, cancle } = dashboard_model_1.DashboardSchema;
const { Ratings } = history_model_1.HistorySchema;
const { details, address, passwordChange } = mysettings_model_1.SettingsSchema;
const router = express_1.default.Router();
const repo = new user_repository_1.UserRepository();
const service = new user_service_1.UserService(repo);
const controller = new user_controller_1.UserController(service);
const loginRepo = new login_repository_1.LoginRepository();
const loginService = new login_service_1.LoginService(loginRepo);
const loginController = new login_controller_1.LoginController(loginService);
const ForgotPassRepo = new forgotPassword_repository_1.ForgotRepository();
const ForgotPassService = new forgotPassword_service_1.ForgotService(ForgotPassRepo);
const ForgotPassController = new forgotPassword_controller_1.ForgotController(ForgotPassService);
const bookServiceRepo = new bookService_repository_1.BookServiceRepository();
const bookService = new bookService_service_1.BookService(bookServiceRepo);
const bookServiceController = new bookService_controller_1.BookServiceController(bookService);
const dashboardrepo = new dashboard_repository_1.DashboardRepository();
const dashboardservice = new dashboard_service_1.DashboardService(dashboardrepo);
const dashboardcontroller = new dashboard_controller_1.DashboardController(dashboardservice);
const historyrepo = new history_repository_1.HistoryRepository();
const historyservice = new history_service_1.HistoryService(historyrepo);
const historycontroller = new history_controller_1.HistoryController(historyservice);
const settingsrepo = new mysettings_repository_1.SettingsRepository();
const settingsservice = new mysettings_service_1.SettingsService(settingsrepo);
const settingscontroller = new mysettings_controller_1.SettingsController(settingsservice);
/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of user
 *     example: 'Akash'
 *    LastName:
 *     type: string
 *     description: Last name of user
 *     example: 'Thakkar'
 *    Email:
 *     type: string
 *     description: email of user
 *     example: 'abc@gmail.com'
 *    Password:
 *     type: string
 *     description: Password
 *     example: 'Aka987'
 *    ConfirmPassword:
 *      type: string
 *      description: Password Confirmation
 *      example: 'Aka987'
 *    Mobile:
 *     type: string
 *     description: mobile number
 *     example: '0123456789'
 *    DateOfBirth:
 *     type: Date
 *     description: BirthDate
 *     example: '10-08-2000'
 */
/**
 * @swagger
 * /helperland/CreateAccount:
 *   post:
 *    summ/CustomerPagesuServiceHistorytion: create Account form
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *     200:
 *      description: Account created successfully
 *     500:
 *      description: failure in creating Account
 */
router.post('/helperland/CreateAccount', controller.CustomerSignup);
/**
* @swagger
* definitions:
*  User:
*   type: object
*   properties:
*    FirstName:
*     type: string
*     description: First name of user
*     example: 'Akash'
*    LastName:
*     type: string
*     description: Last name of user
*     example: 'Thakkar'
*    Email:
*     type: string
*     description: email of user
*     example: 'abc@gmail.com'
*    Password:
*     type: string
*     description: Password
*     example: 'Aka987'
*    ConfirmPassword:
*      type: string
*      description: Password Confirmation
*      example: 'Aka987'
*    Mobile:
*     type: string
*     description: mobile number
*     example: '0123456789'
*    DateOfBirth:
*     type: Date
*     description: BirthDate
*     example: '10-08-2000'
*/
/**
 * @swagger
 * /helperland/BecomeHelper:
 *   post:
 *    summary: Helper sign-up
 *    description: create Account form
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    responses:
 *     200:
 *      description: Account created successfully
 *     500:
 *      description: failure in creating Account
 */
router.post('/helperland/BecomeHelper', controller.HelperSignup);
router.get('/helperland/activate/:token', controller.activateUser);
/**
* @swagger
* definitions:
*  Login:
*   type: object
*   properties:
*    Email:
*     type: string
*     description: Email of user
*     example: 'abc@gmail.com'
*    Password:
*     type: string
*     description: Password of user
*     example: 'aka987'
*/
/**
* @swagger
* /helperland/login:
*  post:
*   summary: User Login
*   description: Login
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#/definitions/Login'
*   responses:
*    200:
*     description: Login successful.
*    401:
*     description: invalid username or password.
*    500:
*     description: something went wrong.
*/
router.post('/helperland/login', (0, celebrate_1.celebrate)(Login), loginController.Login);
//Forgot password routes
/**
* @swagger
* definitions:
*  Forgot:
*   type: object
*   properties:
*    Email:
*     type: string
*     description: Email of user
*     example: 'abc@gmail.com'
*
*/
/**
 * @swagger
 * /helperland/forgot-password:
 *  post:
 *   summary: Forgot Password
 *   description: Enter email
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Forgot'
 *   responses:
 *    200:
 *     description: Email successfully sent.
 *    400:
 *     description: User does not exist.
 *    500:
 *     description: something went wrong.
 */
router.post('/helperland/forgot-password', (0, celebrate_1.celebrate)(Forgot), ForgotPassController.forgotPassword);
/**
* @swagger
* definitions:
*  NewPassword:
*   type: object
*   properties:
*    resetLink:
*     type: string
*     description: reset link
*    newPassword:
*     type: string
*     description: new password
*/
/**
 * @swagger
 * /helperland/reset-password:
 *  post:
 *   summary: Reset Password
 *   description: Enter new password
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/NewPassword'
 *   responses:
 *    200:
 *     description: Password successfully changed.
 *    401:
 *     description: Incorrect or expired token.
 *    400:
 *     description: You used that password recently. Choose different password.
 *    500:
 *     description: something went wrong.
 */
router.post('/helperland/reset-password', (0, celebrate_1.celebrate)(addPassword), ForgotPassController.resetPassword);
/**
 *@swagger
 * definitions:
 *  CheckZipCode:
 *   type: object
 *   properties:
 *    postalcode:
 *     type: string
 *     description: postal code
 *     example: '380058'
*/
/**
 * @swagger
 * /helperland/bookservice/postalcode-check:
 *  post:
 *   summary: Check helper availibility
 *   description: Enter zip code
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CheckZipCode'
 *   responses:
 *    200:
 *     description: service provider found
 *    401:
 *     description: invalid login credential or invalid or expired token
 *    404:
 *     description: not found your area.
 *    500:
 *     description: Can not find service provider.
 *
 */
router.post('/helperland/checkzipcode', (0, celebrate_1.celebrate)(zipcode), loginController.validateToken, bookServiceController.CheckAvailibility);
/**
 * @swagger
 * /helperland/UserAddresses:
 *  get:
 *   summary: Get user addresses
 *   description: get address
 *   responses:
 *    200:
 *     description: address found
 *    401:
 *     description: Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found or Addresses not found
 *    500:
 *     description: failure in finding address
 */
router.get('/helperland/UserAddresses', loginController.validateToken, bookServiceController.getUserAddresses);
/**
*@swagger
* definitions:
*  UserAddress:
*     type: object
*     properties:
*      Addressline1:
*       type: string
*       description: address
*       example: 'New Shaktivijay'
*      Addressline2:
*       type: string
*       description: house number
*       example: '44'
*      City:
*       type: string
*       description: city
*       example: 'Surat'
*      State:
*       type: string
*       description: state
*       example: 'Gujarat'
*      Mobile:
*       type: string
*       description: phone number
*       example: '7990602480'
*/
/**
 * @swagger
 * /helperland/UserAddress:
 *  post:
 *   summary: Create Address
 *   description: Enter address
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserAddress'
 *   responses:
 *    200:
 *     description: address created successfully
 *    401:
 *     description: Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in creating address.
 */
router.post('/helperland/UserAddress', (0, celebrate_1.celebrate)(UserAddress), loginController.validateToken, bookServiceController.createUserAddress);
/**
 * @swagger
 * definitions:
 *  ServiceRequest:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: id of service
 *     example: 1
 *    ServiceStartDate:
 *     type: date
 *     description: date
 *     example: '12-02-22'
 *    ServiceStartTime:
 *     type: string
 *     description: time
 *     example: '12:00'
 *    ServiceHours:
 *     type: integer
 *     description: hours
 *     example: 3
 *    Comments:
 *     type: string
 *     description: comment
 *     example: 'Hi Hello'
 *    PaymentDue:
 *     type: boolean
 *     example: 'true'
 *    HasPets:
 *     type: boolean
 *     example: 'true'
 *    ServiceRequestAddress:
 *     type: object
 *     properties:
 *      Addressline1:
 *       type: string
 *       description: address
 *       example: 'New Shaktivijay'
 *      Addressline2:
 *       type: string
 *       description: house number
 *       example: '44'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Surat'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '7990602480'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '395006'
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId:
 *        type: integer
 *        description: extra service
 *        example: 1
 */
/**
 * @swagger
 * /helperland/CreateRequest:
 *  post:
 *   summary: Create Service Request
 *   description: create service
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceRequest'
 *   responses:
 *    200:
 *     description: service booked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in service booking.
 */
router.post('/helperland/CreateRequest', loginController.validateToken, bookServiceController.decodeToken, bookServiceController.CreateService);
router.get('/helperland/FutureServicerequest', loginController.validateToken, dashboardcontroller.dashboard);
router.get('/helperland/FutureServicerequest/:ServiceId', loginController.validateToken, dashboardcontroller.getServiceById);
router.post('/helperland/RescheduleService/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(reschedule), dashboardcontroller.rescheduleService, dashboardcontroller.rescheduleIfTimeSlotNotConflicts);
router.post('/helperland/cancleServicerequest/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(cancle), dashboardcontroller.cancleServiceRequest);
router.get('/helperland/pastServicerequest', loginController.validateToken, historycontroller.history);
router.get('/helperland/pastServicerequest/:ServiceId', loginController.validateToken, historycontroller.getServiceById);
router.post('/helperland/giveRatings/:ServiceRequestId', loginController.validateToken, (0, celebrate_1.celebrate)(Ratings), historycontroller.giveRatings);
router.put('/update-user-details', loginController.validateToken, (0, celebrate_1.celebrate)(details), settingscontroller.updateUserDetails);
router.put('/update-user-address/:Id', loginController.validateToken, (0, celebrate_1.celebrate)(address), settingscontroller.updateUserAddress);
router.delete('/delete-user-address/:Id', loginController.validateToken, settingscontroller.deleteAddress);
router.put('/change-user-password', loginController.validateToken, (0, celebrate_1.celebrate)(passwordChange), settingscontroller.changePassword);
module.exports = router;
