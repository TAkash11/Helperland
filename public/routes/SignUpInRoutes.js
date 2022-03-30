"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const user_repository_1 = require("../User/user.repository");
const user_service_1 = require("../User/user.service");
const user_controller_1 = require("../User/user.controller");
const login_repository_1 = require("../Login/login.repository");
const login_model_1 = require("../Login/login.model");
const login_service_1 = require("../Login/login.service");
const login_controller_1 = require("../Login/login.controller");
const forgotPassword_repository_1 = require("../ForgotPassword/forgotPassword.repository");
const forgotPassword_service_1 = require("../ForgotPassword/forgotPassword.service");
const forgotPassword_controller_1 = require("../ForgotPassword/forgotPassword.controller");
const forgotPassword_model_1 = require("../ForgotPassword/forgotPassword.model");
const { Login } = login_model_1.LoginSchema;
const { addPassword, Forgot } = forgotPassword_model_1.ResetSchema;
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
router.get('/activate/:token', controller.activateUser);
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
router.post('/login', (0, celebrate_1.celebrate)(Login), loginController.Login);
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
router.post('/forgot-password', (0, celebrate_1.celebrate)(Forgot), ForgotPassController.forgotPassword);
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
router.post('/reset-password', (0, celebrate_1.celebrate)(addPassword), ForgotPassController.resetPassword);
module.exports = router;
