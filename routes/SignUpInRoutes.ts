import express from "express";
import { celebrate } from "celebrate";

import { UserRepository } from "../User/user.repository";
import { UserService } from "../User/user.service"
import { UserController } from "../User/user.controller";

import { LoginRepository } from "../Login/login.repository";
import { LoginSchema } from "../Login/login.model";
import { LoginService } from "../Login/login.service"
import { LoginController } from "../Login/login.controller";

import { ForgotRepository } from '../ForgotPassword/forgotPassword.repository';
import { ForgotService } from "../ForgotPassword/forgotPassword.service";
import { ForgotController } from '../ForgotPassword/forgotPassword.controller';
import { ResetSchema } from "../ForgotPassword/forgotPassword.model";

const {Login} = LoginSchema;
const {addPassword,Forgot} = ResetSchema;

const router:express.Router = express.Router();

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const ForgotPassRepo:ForgotRepository = new ForgotRepository();
const ForgotPassService:ForgotService = new ForgotService(ForgotPassRepo);
const ForgotPassController:ForgotController = new ForgotController(ForgotPassService);

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
 * /CreateAccount:
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
 router.post('/CreateAccount', controller.CustomerSignup);
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
 * /BecomeHelper:
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
router.post('/BecomeHelper', controller.HelperSignup);
router.get('/activate/:token',controller.activateUser);
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
* /login:
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
router.post('/login',celebrate(Login),loginController.Login);
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
 * /forgot-password:
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
 router.post('/forgot-password',celebrate(Forgot),ForgotPassController.forgotPassword);

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
  * /reset-password:
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
router.post('/reset-password',celebrate(addPassword),ForgotPassController.resetPassword); 

export = router;