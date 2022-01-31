"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var express_1 = __importDefault(require("express"));
var contact_repository_1 = require("./ContactUs/contact.repository");
var contact_controller_1 = require("./ContactUs/contact.controller");
var contact_service_1 = require("./ContactUs/contact.service");
// import { AttachmentController } from "./Attachment/attachment.controller";
// import { AttachmentRepository } from "./Attachment/attachment.repository";
// import { AttachmentService } from "./Attachment/attachment.service";
var router = express_1["default"].Router();

var repo = new contact_repository_1.ContactUsRepository();
var service = new contact_service_1.ContactUsService(repo);
var controller = new contact_controller_1.ContactUsController(service);
// const attachmentRepo:AttachmentRepository = new AttachmentRepository();
// const attachmentService:AttachmentService = new AttachmentService(attachmentRepo);
// const attachmentController:AttachmentController = new AttachmentController(attachmentService);
router.post('/contactus', controller.createUsers);
router.get('/contactusAll', controller.getall);
router.get('/contactus/:id', controller.getUserById);
module.exports = router;
