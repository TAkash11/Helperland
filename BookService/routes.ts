import express from "express";
import { celebrate } from "celebrate";
import { UserRepository } from "./User/user.repository";
import { UserService } from "./User/user.service";
import { UserController } from "./User/user.controller";
import { LoginRepository } from "./Login/login.repository";
import { LoginSchema } from "./Login/login.model";
import { LoginService } from "./Login/login.service";
import { LoginController } from "./Login/login.controller";
import { ForgotRepository } from './ForgotPassword/forgotPassword.repository';
import { ForgotService } from './ForgotPassword/forgotPassword.service';
import { ForgotController } from './ForgotPassword/forgotPassword.controller';
import { ResetSchema } from "./ForgotPassword/forgotPassword.model";
import { BookServiceRepository } from "./BookService/bookService.repository";
import { BookServiceController} from "./BookService/bookService.controller";
import {BookService} from "./BookService/bookService.service";

import { BookServiceSchema } from "./BookService/bookService.model";

const {Login} = LoginSchema;
const {addPassword} = ResetSchema;
const { zipcode, UserAddress, CreateService} = BookServiceSchema;
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
 *    summary: customer sign-up
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
 router.post('/helperland/forgot-password', ForgotPassController.forgotPassword);

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
router.post('/helperland/reset-password',ForgotPassController.resetPassword); 

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

router.post('helperland/UserAddress', celebrate(UserAddress),loginController.validateToken,bookServiceController.createUserAddress);

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
 router.post('/helperland/CreateRequest', celebrate(CreateService),loginController.validateToken,bookServiceController.decodeToken, bookServiceController.CreateService);

export = router;