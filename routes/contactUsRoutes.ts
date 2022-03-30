import express from "express";
import { celebrate } from 'celebrate';
import { ContactUsRepository } from "../ContactUs/contact.repository";
import { ContactUsSchema } from "../ContactUs/contact.model";
import { ContactUsController } from "../ContactUs/contact.controller";
import {ContactUsService} from "../ContactUs/contact.service";

const router: express.Router = express.Router();

const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);

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

router.get('/contactusAll',controller.getall);

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
router.get('/contactus/:id',controller.getUserById);

export = router;