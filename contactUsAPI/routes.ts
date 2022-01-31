import express from "express";
import { celebrate } from 'celebrate';
import { ContactUsRepository } from "./ContactUs/contact.repository";
import { ContactUsSchema } from "./ContactUs/contact.model";
import { ContactUsController } from "./ContactUs/contact.controller";
import {ContactUsService} from "./ContactUs/contact.service";


// import { AttachmentController } from "./Attachment/attachment.controller";
// import { AttachmentRepository } from "./Attachment/attachment.repository";
// import { AttachmentService } from "./Attachment/attachment.service";


const router: express.Router = express.Router();



const repo: ContactUsRepository = new ContactUsRepository();
const service: ContactUsService= new ContactUsService(repo);
const controller: ContactUsController = new ContactUsController(service);

// const attachmentRepo:AttachmentRepository = new AttachmentRepository();
// const attachmentService:AttachmentService = new AttachmentService(attachmentRepo);
// const attachmentController:AttachmentController = new AttachmentController(attachmentService);

router.post('/contactus', controller.createUsers);
router.get('/contactusAll',controller.getall);
router.get('/contactus/:id',controller.getUserById);

export = router;