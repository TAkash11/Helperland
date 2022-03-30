import express from "express";
import { celebrate } from 'celebrate';

import { BookServiceRepository } from "../BookService/bookService.repository";
import { BookServiceController} from "../BookService/bookService.controller";
import {BookService} from "../BookService/bookService.service";
import { BookServiceSchema } from "../BookService/bookService.model";

import { LoginRepository } from "../Login/login.repository";
import { LoginService } from "../Login/login.service"
import { LoginController } from "../Login/login.controller";

const { zipcode, UserAddress, CreateService} = BookServiceSchema;

const bookServiceRepo:BookServiceRepository = new BookServiceRepository();
const bookService:BookService = new BookService(bookServiceRepo);
const bookServiceController:BookServiceController = new BookServiceController(bookService);

const loginRepo:LoginRepository = new LoginRepository();
const loginService:LoginService = new LoginService(loginRepo);
const loginController:LoginController = new LoginController(loginService);

const router:express.Router = express.Router();

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
 * /bookservice/postalcode-check:
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
 router.post('/checkzipcode',celebrate(zipcode),loginController.validateToken,bookServiceController.CheckAvailibility);

 /**
  * @swagger
  * /UserAddresses:
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
 router.get('/UserAddresses', loginController.validateToken,bookServiceController.getUserAddresses);
 
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
  * /UserAddress:
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
 
 router.post('/UserAddress', celebrate(UserAddress),loginController.validateToken,bookServiceController.createUserAddress);
 
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
  * /CreateRequest:
  *  post:
  *   summary: Create Service Request
  *   description: ServiceRequest
  *   tags: 
  *    - Book Service
  *   parameters:
  *    - in: header
  *      name: auth
  *      schema:
  *       type: string
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
 
router.post('/CreateRequest',loginController.validateToken, bookServiceController.decodeToken, bookServiceController.CreateService);

export = router;