"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const user_repository_1 = require("./User/user.repository");
const user_service_1 = require("./User/user.service");
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
const NewServiceRequest_controller_1 = require("./ServiceProviderPages/NewServiceRequest/NewServiceRequest.controller");
const NewServiceRequest_service_1 = require("./ServiceProviderPages/NewServiceRequest/NewServiceRequest.service");
const NewServiceRequest_controller_2 = require("./ServiceProviderPages/NewServiceRequest/NewServiceRequest.controller");
const UpcomingServiceRequest_controller_1 = require("./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.controller");
const UpcomingServiceRequestServiceR_1 = require("./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequestServiceR");
const UpcomingServiceRequest_controller_2 = require("./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.controller");
const ServiceHistory_repository_1 = require("./ServiceProviderPages/ServiceHistory/ServiceHistory.repository");
const ServiceHistory_controller_1 = require("./ServiceProviderPages/ServiceHistory/ServiceHistory.controller");
const ServiceHistoryServiceR_1 = require("./ServiceProviderPages/ServiceHistory/ServiceHistoryServiceR");
const BlockCustomer_repository_1 = require("./ServiceProviderPages/BlockCustomer/BlockCustomer.repository");
const BlockCustomerServiceR_1 = require("./ServiceProviderPages/BlockCustomer/BlockCustomerServiceR");
const BlockCustomer_controller_1 = require("./ServiceProviderPages/BlockCustomer/BlockCustomer.controller");
const BlockCustomer_model_1 = require("./ServiceProviderPages/BlockCustomer/BlockCustomer.model");
const MySettings_repository_1 = require("./ServiceProviderPages/MySettings/MySettings.repository");
const MySettingsServiceR_1 = require("./ServiceProviderPages/MySettings/MySettingsServiceR");
const MySettings_controller_1 = require("./ServiceProviderPages/MySettings/MySettings.controller");
const MySettings_model_1 = require("./ServiceProviderPages/MySettings/MySettings.model");
const { Login } = login_model_1.LoginSchema;
const { addPassword, Forgot } = forgotPassword_model_1.ResetSchema;
const { zipcode, UserAddress, CreateService } = bookService_model_1.BookServiceSchema;
const { reschedule, cancle } = dashboard_model_1.DashboardSchema;
const { Ratings } = history_model_1.HistorySchema;
const { details, address, passwordChange } = mysettings_model_1.SettingsSchema;
const { UpdateUser, ChangePassword } = MySettings_model_1.MySettingsSchema;
const { Blocked } = BlockCustomer_model_1.BlockCustomerSchema;
const router = express_1.default.Router();
const repo = new user_repository_1.UserRepository();
constServiceRUserService = new user_service_1.UserService(repo);
const controller = new UserControllerServiceR;
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
const serviceRequestRepo = new NewServiceRequest_controller_1.ServiceRequestRepository();
const serviceRequestService = new NewServiceRequest_service_1.ServiceRequestService(serviceRequestRepo);
const serviceRequestController = new NewServiceRequest_controller_2.ServiceRequestController(serviceRequestService);
const upcomingServiceRepo = new UpcomingServiceRequest_controller_1.UpcomingServicesRepository();
const upcomingService = new UpcomingServiceRequestServiceR_1.UpcomingService(upcomingServiceRepo);
const upcomingServiceController = new UpcomingServiceRequest_controller_2.UpcomingServiceController(upcomingService);
const serviceHistoryRepo = new ServiceHistory_repository_1.ServiceHistoryRepository();
const serviceHistoryService = new ServiceHistoryServiceR_1.ServiceHistoryService(serviceHistoryRepo);
const serviceHistoryController = new ServiceHistory_controller_1.ServiceHistoryController(serviceHistoryService);
const blockCustomerRepo = new BlockCustomer_repository_1.BlockCustomerRepository();
const blockCustomerService = new BlockCustomerServiceR_1.BlockCustomerService(blockCustomerRepo);
const blockCustomerController = new BlockCustomer_controller_1.BlockCustomerController(blockCustomerService);
const mySettingsRepo = new MySettings_repository_1.MySettingsRepository();
const mySettingsService = new MySettingsServiceR_1.MySettingsService(mySettingsRepo);
const mySettingsController = new MySettings_controller_1.MySettingsController(mySettingsService);
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
 *     description:ServiceRrovider found
 *    401:
 *     description: invalid login credential or invalid or expired token
 *    404:
 *     description: not found your area.
 *    500:
 *     description: Can not findServiceRrovider.
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
 *     description: id ofServiceR*     example: 1
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
 *        description: extraServiceR*        example: 1
 */
/**
 * @swagger
 * /helperland/CreateRequest:
 *  post:
 *   summary: Create ServiceRequest
S*   deHcription: createServiceR*   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceRequest'
 *   responses:
 *    200:
 *     description:ServiceRooked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure inServiceRooking.
 */
// **************CustomerPages Routes*********//
router.post('/helperland/CreateRequest', loginController.validateToken, bookServiceController.decodeToken, bookServiceController.CreateService);
router.get('/helperland/FutureServicerequest', loginController.validateToken, dashboardcontroller.dashboard);
router.get('/helperland/FutureServicerequest/:ServiceId', loginController.validateToken, dashboardcontroller.getServiceById);
router.post('/helperland/RescheduleService/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(reschedule), dashboardcontroller.rescheduleService, dashboardcontroller.rescheduleIfTimeSlotNotConflicts);
router.post('/helperland/cancleServicerequest/:ServiceId', loginController.validateToken, (0, celebrate_1.celebrate)(cancle), dashboardcontroller.cancleServiceRequest);
router.get('/helperland/pastServicerequest', loginController.validateToken, historycontroller.history);
router.get('/helperland/pastServicerequest/:ServiceId', loginController.validateToken, historycontroller.getServiceById);
router.post('/helperland/giveRatings/:ServiceRequestId', loginController.validateToken, (0, celebrate_1.celebrate)(Ratings), historycontroller.giveRatings);
router.put('/helperland/UpdateUserDetails', loginController.validateToken, (0, celebrate_1.celebrate)(details), settingscontroller.updateUserDetails);
router.put('/helperland/UpdateUserAddress/:Id', loginController.validateToken, (0, celebrate_1.celebrate)(address), settingscontroller.updateUserAddress);
router.delete('/helperland/DeleteAddress/:Id', loginController.validateToken, settingscontroller.deleteAddress);
router.put('/helperland/UpdateUserPass', loginController.validateToken, (0, celebrate_1.celebrate)(passwordChange), settingscontroller.changePassword);
// **************ServiceProviderPages Routes***************//
router.get("/helperland/SPNewServiceRequests", loginController.validateToken, serviceRequestController.getAllNewServiceRequests);
router.get("/helperland/SPAcceptRequest/:requestId", loginController.validateToken, serviceRequestController.acceptableNewServiceRequestOrNot, serviceRequestController.acceptNewServiceRequest);
router.get("/helperland/ServiceRequestDetail/:requestId", loginController.validateToken, serviceRequestController.getServiceRequestDetailById);
//Upcoming Services
router.get("/helperland/SPUpcomingServiceRequest", loginController.validateToken, upcomingServiceController.getUpcomingServices);
router.put("/helperland/SPCancelServiceRequest/:requestId", loginController.validateToken, upcomingServiceController.cancelServiceRequest);
router.put("/helperland/SPCompleteServiceRequest/:requestId", loginController.validateToken, upcomingServiceController.completeServiceRequest);
router.get("/helperland/ServiceRetail/:id", loginController.validateToken, upcomingServiceController.getServiceRequestDetailById);
//Service History
router.get("/helperland/SPerviceRequestHistory", loginController.validateToken, serviceHistoryController.getCompletedServiceRequest);
router.get("/helperland/ServiceRequestHistoryDetail/:id", loginController.validateToken, serviceHistoryController.getServiceRequestDetailById);
router.get("/helperland/ServiceRequestHistory/download", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);
//Ratings
router.get("/helperland/SPatings", loginController.validateToken, serviceHistoryController.displayRatingsOfHelper);
//Block Unblock Customer
router.get("/helperland/GetCustomerforHelper", loginController.validateToken, blockCustomerController.getCustomerWorkedWithHelper);
router.put("/helperland/BlockunblockCustomer/:userId", (0, celebrate_1.celebrate)(Blocked), loginController.validateToken, blockCustomerController.addCustomerInBlockList, blockCustomerController.removeCustomerFromBlockList);
//My settings
router.get("/helperland/MyDetails", loginController.validateToken, mySettingsController.getUserDetailById);
router.put("/helperland/MyDetails", (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById, mySettingsController.updateOrCreateAddress);
//Change Password
router.put("/helperland/changePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);
module.exports = router;
