import express from "express";
import { celebrate } from "celebrate";

import { UserRepository } from "./User/user.repository";
import { UserService } from "./User/user.service"
import { UserController } from "./User/user.controller";

import { LoginRepository } from "./Login/login.repository";
import { LoginSchema } from "./Login/login.model";
import { LoginService } from "./Login/login.service"
import { LoginController } from "./Login/login.controller";

import { ForgotRepository } from './ForgotPassword/forgotPassword.repository';
import { ForgotService } from "./ForgotPassword/forgotPassword.service";
import { ForgotController } from './ForgotPassword/forgotPassword.controller';
import { ResetSchema } from "./ForgotPassword/forgotPassword.model";

import { BookServiceRepository } from "./BookService/bookService.repository";
import { BookServiceController} from "./BookService/bookService.controller";
import {BookService} from "./BookService/bookService.service";
import { BookServiceSchema } from "./BookService/bookService.model";

import { DashboardRepository } from "./CustomerPages/Dashboard/dashboard.repository";
import { DashboardSchema } from "./CustomerPages/Dashboard/dashboard.model";
import { DashboardService } from "./CustomerPages/Dashboard/dashboard.service";
import { DashboardController } from "./CustomerPages/Dashboard/dashboard.controller";

import { HistoryRepository } from "./CustomerPages/ServiceHistory/history.repository";
import { HistorySchema } from "./CustomerPages/ServiceHistory/history.model";
import { HistoryService } from "./CustomerPages/ServiceHistory/history.service";
import { HistoryController } from "./CustomerPages/ServiceHistory/history.controller";

import { SettingsRepository } from "./CustomerPages/MySettings/mysettings.repository";
import { SettingsSchema } from "./CustomerPages/MySettings/mysettings.model";
import { SettingsService } from "./CustomerPages/MySettings/mysettings.service"
import { SettingsController } from "./CustomerPages/MySettings/mysettings.controller"; 

import { ServiceRequestRepository } from "./ServiceProviderPages/NewServiceRequest/NewServiceRequest.repository";
import { ServiceRequestService } from "./ServiceProviderPages/NewServiceRequest/NewServiceRequest.service";
import { ServiceRequestController } from "./ServiceProviderPages/NewServiceRequest/NewServiceRequest.controller";

import { UpcomingServicesRepository } from "./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.repository";
import { UpcomingService } from "./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.service"
import { UpcomingServiceController } from "./ServiceProviderPages/UpcomingServiceRequest/UpcomingServiceRequest.controller";

import { ServiceHistoryRepository } from "./ServiceProviderPages/ServiceHistory/ServiceHistory.repository";
import { ServiceHistoryController } from "./ServiceProviderPages/ServiceHistory/ServiceHistory.controller";
import { ServiceHistoryService } from "./ServiceProviderPages/ServiceHistory/ServiceHistory.service";

import { BlockCustomerRepository } from "./ServiceProviderPages/BlockCustomer/BlockCustomer.repository";
import { BlockCustomerService } from "./ServiceProviderPages/BlockCustomer/BlockCustomer.service";
import { BlockCustomerController } from "./ServiceProviderPages/BlockCustomer/BlockCustomer.controller";
import { BlockCustomerSchema } from "./ServiceProviderPages/BlockCustomer/BlockCustomer.model";

import { MySettingsRepository } from "./ServiceProviderPages/MySettings/MySettings.repository";
import { MySettingsService } from "./ServiceProviderPages/MySettings/MySettings.service";
import { MySettingsController } from "./ServiceProviderPages/MySettings/MySettings.controller";
import { MySettingsSchema } from "./ServiceProviderPages/MySettings/MySettings.model";

const {Login} = LoginSchema;
const {addPassword,Forgot} = ResetSchema;
const { zipcode, UserAddress, CreateService} = BookServiceSchema;
const { reschedule, cancle } = DashboardSchema;
const { Ratings } = HistorySchema;
const { details, address, passwordChange } = SettingsSchema;
const { UpdateUser, ChangePassword } = MySettingsSchema;
const { Blocked } = BlockCustomerSchema;

const router: express.Router = express.Router();

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const ForgotPassRepo:ForgotRepository = new ForgotRepository();
const ForgotPassService:ForgotService = new ForgotService(ForgotPassRepo);
const ForgotPassController:ForgotController = new ForgotController(ForgotPassService);

const bookServiceRepo:BookServiceRepository = new BookServiceRepository();
const bookService:BookService = new BookService(bookServiceRepo);
const bookServiceController:BookServiceController = new BookServiceController(bookService);

const dashboardrepo: DashboardRepository = new DashboardRepository();
const dashboardservice: DashboardService = new DashboardService(dashboardrepo);
const dashboardcontroller: DashboardController = new DashboardController(dashboardservice);


const historyrepo: HistoryRepository = new HistoryRepository();
const historyservice: HistoryService = new HistoryService(historyrepo);
const historycontroller: HistoryController = new HistoryController(historyservice);

const settingsrepo: SettingsRepository = new SettingsRepository();
const settingsservice: SettingsService = new SettingsService(settingsrepo);
const settingscontroller: SettingsController = new SettingsController(settingsservice);

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
router.get('/helperland/activate/:token',controller.activateUser);
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
router.post('/helperland/login',celebrate(Login),loginController.Login);
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
 router.post('/helperland/forgot-password',celebrate(Forgot),ForgotPassController.forgotPassword);

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
router.post('/helperland/reset-password',celebrate(addPassword),ForgotPassController.resetPassword); 

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
router.post('/helperland/checkzipcode',celebrate(zipcode),loginController.validateToken,bookServiceController.CheckAvailibility);

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
router.get('/helperland/UserAddresses', loginController.validateToken,bookServiceController.getUserAddresses);

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

router.post('/helperland/UserAddress', celebrate(UserAddress),loginController.validateToken,bookServiceController.createUserAddress);

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

router.post('/helperland/CreateRequest',loginController.validateToken,bookServiceController.decodeToken, bookServiceController.CreateService);

router.get('/helperland/FutureServicerequest', loginController.validateToken, dashboardcontroller.dashboard);

router.get('/helperland/FutureServicerequest/:ServiceId', loginController.validateToken, dashboardcontroller.getServiceById);

router.post('/helperland/RescheduleService/:ServiceId', loginController.validateToken, celebrate(reschedule), dashboardcontroller.rescheduleService, dashboardcontroller.rescheduleIfTimeSlotNotConflicts);

router.post('/helperland/cancleServicerequest/:ServiceId', loginController.validateToken, celebrate(cancle), dashboardcontroller.cancleServiceRequest);


router.get('/helperland/pastServicerequest', loginController.validateToken, historycontroller.history);

router.get('/helperland/pastServicerequest/:ServiceId', loginController.validateToken, historycontroller.getServiceById);

router.post('/helperland/giveRatings/:ServiceRequestId', loginController.validateToken, celebrate(Ratings), historycontroller.giveRatings);


router.put('/helperland/UpdateUserDetails', loginController.validateToken, celebrate(details), settingscontroller.updateUserDetails);

router.put('/helperland/UpdateUserAddress/:Id', loginController.validateToken, celebrate(address), settingscontroller.updateUserAddress);

router.delete('/helperland/DeleteAddress/:Id', loginController.validateToken, settingscontroller.deleteAddress);

router.put('/helperland/UpdateUserPass', loginController.validateToken, celebrate(passwordChange), settingscontroller.changePassword);

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

router.put("/helperland/BlockunblockCustomer/:userId", celebrate(Blocked), loginController.validateToken, blockCustomerController.addCustomerInBlockList, blockCustomerController.removeCustomerFromBlockList);

//My settings
router.get("/helperland/MyDetails", loginController.validateToken, mySettingsController.getUserDetailById);

router.put("/helperland/MyDetails", celebrate(UpdateUser), loginController.validateToken, mySettingsController.updateUserDetailById, mySettingsController.updateOrCreateAddress);

//Change Password
router.put("/helperland/changePassword", celebrate(ChangePassword), loginController.validateToken, mySettingsController.changeUserPassword);

export = router;