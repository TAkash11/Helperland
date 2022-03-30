"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const contact_repository_1 = require("../ContactUs/contact.repository");
const contact_controller_1 = require("../ContactUs/contact.controller");
const contact_service_1 = require("../ContactUs/contact.service");
const router = express_1.default.Router();
const repo = new contact_repository_1.ContactUsRepository();
const service = new contact_service_1.ContactUsService(repo);
const controller = new contact_controller_1.ContactUsController(service);
/**
 * @swagger
 * definitions:
 *  ContactUs:
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
 *     example: 'akashthakkar@gmail.com'
 *    Subject:
 *     type: string
 *     description: subject
 *     example: 'Issues'
 *    PhoneNumber:
 *     type: string
 *     description: phone number
 *     example: '0123456789'
 *    Message:
 *     type: string
 *     description: message
 *     example: 'having issue'
 *    file:
 *     type: file
 *     description: upload file
 *     example: 'file.jpg'
 */
/**
 * @swagger
 * /contactus:
 *   post:
 *    summary: creact contacts
 *    description: create contacts form
 *    parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *        type: string
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
router.post('/contactus', controller.createUsers);
/**
 * @swagger
 * /contacts:
 *  get:
 *   summary: get all contacts
 *   description: get all contacts
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.get('/contactusAll', controller.getall);
/**
 * @swagger
 * /contacts/{ContactUsId}:
 *  get:
 *   summary: get contacts by Id
 *   description: get contacts by Id
 *   parameters:
 *    - in: path
 *      name: ContactUsId
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of contacts form
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
router.get('/contactus/:id', controller.getUserById);
module.exports = router;
