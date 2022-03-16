import { Request, Response, RequestHandler } from "express";
import { BlockCustomerService } from "./BlockCustomer.service";
import mailgun from "mailgun-js";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class BlockCustomerController {
  public constructor(private readonly blockCustomerService: BlockCustomerService) {
    this.blockCustomerService = blockCustomerService;
  }

  public getCustomerWorkedWithHelper:RequestHandler = async(req, res):Promise<Response> => {
    if (req.body.userTypeId === 3 && req.body.userId) {
      const customers = await this.blockCustomerService.getCustomerWorkedWithHelper(req.body.userId)!;
      if(customers){
        if(customers.length>0){
          return res.status(200).json(customers);
        }else{
          return res.status(401).json({ message: "customers not found" });
        }
      }else{
        return res.status(404).json({ message: "customers not found" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public addCustomerInBlockList:RequestHandler = async(req, res, next):Promise<Response|void> => {
    if (req.body.userTypeId === 3 && req.body.userId) {
      req.body.TargetUserId = req.params.userId;
      if(req.body.IsBlocked){
        const inCustomerList = await this.blockCustomerService.hasHelperWorkedForCustomer(req.body.userId, req.params.userId);
        if(inCustomerList){
          return this.blockCustomerService.getBlockedCustomer(req.body.userId,req.params.userId)
        .then(blockedCustomer => {
          if(blockedCustomer && blockedCustomer.IsBlocked){
            return res.status(201).json({message:'customer alraedy in blocked list'})
          }else if(blockedCustomer && blockedCustomer.IsBlocked === false){
            return this.blockCustomerService.updateBlockedCustomer(req.body.userId, req.params.userId)
            .then(updatedCustomer => {
              if(updatedCustomer[0] === 1){
                return res.status(200).json({message:'customer successfull added in block list'});
              }else{
                return res.status(422).json({message:'error in adding blocked list'});
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({error: error});
            })
          }else{
            req.body.UserId = req.body.userId;
            req.body.IsFavorite = false;
            return this.blockCustomerService.createBlockUnblockCustomer(req.body)
            .then(createdBlockedCustomer => {
              if(createdBlockedCustomer){
                return res.status(200).json(createdBlockedCustomer);
              }else{
                return res.status(404).json({message:'error in creating data'});
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({error: error});
            });
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
        }else{
          return res.status(400).json({message:'helper has not worked for this customer'});
        }
      }else{
        next();
      }
    } else {
      return res.status(401).json({ message: "Unauthorised User" });
    }
  };

  public removeCustomerFromBlockList:RequestHandler = async(req, res, next):Promise<Response> => {
      if(req.body.IsBlocked === false){
        return this.blockCustomerService.getBlockedCustomer(req.body.userId,req.params.userId)
        .then(blockedCustomer => {
          if(blockedCustomer && blockedCustomer.IsBlocked){
            return this.blockCustomerService.updateUnBlockedCustomer(req.body.userId, req.params.userId)
            .then(updatedCustomer => {
              if(updatedCustomer[0] === 1){
                return res.status(200).json({message:'customer successfull added in unblock list'});
              }else{
                return res.status(422).json({message:'error in adding unblocke list'});
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({error: error});
            })
            
          }else if(blockedCustomer && blockedCustomer.IsBlocked === false){
            return res.status(201).json({message:'customer alraedy in unblocke list'})
          }else{
            return res.status(404).json({message:'no customer in blocklist to unblock'});
          }
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json({error: error});
        });
      }else{
        return res.status(400).json({message:'proper input not found in request body'});
      }
  };

}