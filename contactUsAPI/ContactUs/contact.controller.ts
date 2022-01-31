import { Request, Response, RequestHandler } from 'express';
import { ContactUs } from "../models/contactus";
import { ContactUsService } from './contact.service';


export class ContactUsController{
    public constructor(private readonly contactusService: ContactUsService){
        this.contactusService = contactusService;
    }


    public getall : RequestHandler = async (req, res):Promise<Response> => {
        return this.contactusService
        .getall()
        .then((user:ContactUs[]) => {
            return res.status(200).json({user});
        })
        .catch((error:Error) => {
            return res.status(500).json({
                error: error
              });
        });
    }

    public createUsers : RequestHandler= async (req, res): Promise<Response> => {
      const firstName:string = req.body.FirstName;
      const lastName:string = req.body.LastName;
      const Name:string = firstName+" "+lastName;

      req.body.Name = Name;
      req.body.UploadFileName = req.file?.originalname;
      req.body.path = req.file?.path;
      console.log(req.body);
        return this.contactusService
          .createUsers(req.body)
          .then((user: ContactUs) => {
            return res.status(200).json({ user });
          })
          .catch((error: Error) => {
              console.log(error);
            return res.status(500).json({
              error: error
            });
          });
      };

      public getUserById: RequestHandler = async(req, res):Promise<Response> =>{
          return this.contactusService.getUserById(+req.params.id)
          .then((user:any) => {
            if (user) {
              return res.status(200).json({ user });
            }
            return res.status(404).json({ error: 'NotFound' });
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      }
    }