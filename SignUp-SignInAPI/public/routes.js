"use strict";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var user_repository_1 = require("./User/user.repository");
var user_service_1 = require("./User/user.service");
var user_controller_1 = require("./User/user.controller");
var login_repository_1 = require("./Login/login.repository");
var login_model_1 = require("./Login/login.model");
var login_service_1 = require("./Login/login.service");
var login_controller_1 = require("./Login/login.controller");
var ForgotPassword_repository_1 = require("./ForgotPassword/forgotPassword.repository");
var ForgottPassword_service_1 = require("./ForgotPassword/forgotPassword.service");
var ForgotPassword_controller_1 = require("./ForgotPassword/forgotPassword.controller");
var Login = login_model_1.LoginSchema.Login;
var router = express_1.default.Router();
var repo = new user_repository_1.UserRepository();
var service = new user_service_1.UserService(repo);
var controller = new user_controller_1.UserController(service);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
var ForgottPassRepo = new ForgotPassword_repository_1.ResetRepository();
var ForgotPassService = new ForgottPassword_service_1.ResetService(resetPassRepo);
var ForgottPassController = new ForgotPassword_controller_1.ResetController(resetPassService);
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
router.post('/login', (0, celebrate_1.celebrate)(Login), loginController.Login);

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
router.post('/forgot-password', (0, celebrate_1.celebrate)(addReset), ForgotPassController.forgotPassword);
module.exports = router;
