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
import { ForgottController } from './ForgotPassword/forgotPassword.controller';
import { ResetSchema } from "./ForgotPassword/forgotPassword.model";


const {Login} = LoginSchema;
const {addPassword} = ResetSchema;
const router: express.Router = express.Router();

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const resetPassRepo:ForgotRepository = new ForgotRepository();
const resetPassService:ForgotService = new ForgotService(resetPassRepo);
const resetPassController:ForgottController = new ForgottController(resetPassService);

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

 /**
 * @swagger
 * /trainee2021/login:
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
 * /trainee2021/forgot-password:
 *  post:
 *   summary: Reset Password
 *   description: Enter email
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reset'
 *   responses:
 *    200:
 *     description: Email successfully sent.
 *    400:
 *     description: User does not exist.
 *    500:
 *     description: something went wrong.
 */
router.post('/forgot-password', celebrate(addPassword),resetPassController.forgotPassword);

export = router;