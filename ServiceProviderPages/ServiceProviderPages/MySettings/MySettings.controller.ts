import { Request, Response, RequestHandler } from "express";
import { MySettingsService } from "./MySettings.service";
import mailgun from "mailgun-js";
import bcrypt from "bcrypt";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

export class MySettingsController {
  public constructor(private readonly mySettingsService: MySettingsService) {
    this.mySettingsService = mySettingsService;
  }

  public getUserDetailById: RequestHandler = async (req,res): Promise<Response> => {
    const UserId = parseInt(req.body.userId);
    if (UserId && req.body.userTypeId === 3) {
      return this.mySettingsService
        .getUserDetailById(UserId)
        .then((userDetail) => {
          if(userDetail){
            return res.status(200).json(userDetail);
          }else{
            return res.status(404).json({message:'detail not found'});
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    }
    else{
      return res.status(400).json({message:'proper input not found in request'});
    }
  };

  public updateUserDetailById:RequestHandler = async(req, res, next):Promise<Response|void> => {
    console.log(req.body);
    if(req.body.userId && req.body.userTypeId === 3){
      req.body.DateOfBirth = this.mySettingsService.convertStringToDate(req.body.DateOfBirth);
      return this.mySettingsService.updateUserDetailbyId(req.body.userId, req.body)
      .then(updatedUser => {
        if(updatedUser){
          next();
        }else{
          return res.status(422).json({message:'error in updating user detail'});
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      });
    }else{
      return res.status(400).json({message:'proper input not found in request'});
    }
  };

  public updateOrCreateAddress:RequestHandler = async(req, res):Promise<Response> => {
    const UserId = parseInt(req.body.userId); 
    if(UserId && req.body.userTypeId === 3){
      return this.mySettingsService.getHelperAddressById(UserId)
      .then(userAddress => {
        if(userAddress){
          return this.mySettingsService.updateUserAddress(userAddress.AddressId,req.body)
          .then(updatedAddress => {
            if(updatedAddress){
              return res.status(200).json({message:'details updated successfully'});
            }else{
              return res.status(422).json({message:'error in updating address'});
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
        }else{
          return this.mySettingsService.createAddress(UserId, req.body)
          .then(address => {
            if(address){
              return res.status(200).json(address);
            }else{
              return res.status(500).json({message:'error in creating address'});
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ error: error });
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      })
    }else{
      return res.status(400).json({message:'proper input not found in request'});
    }
  };

  public changeUserPassword:RequestHandler = async(req, res):Promise<Response> => {
    if(req.body.userId && req.body.userTypeId === 3){
      return this.mySettingsService.getUserById(req.body.userId)
      .then(async user => {
        if(user){
          const match = await bcrypt.compare(req.body.OldPassword, user.Password!);
          if(match){
            if(req.body.NewPassword === req.body.ConfirmPassword){
              const hashedPassword = await bcrypt.hash(req.body.NewPassword, 10);
              return this.mySettingsService.changePassword(req.body.userId, hashedPassword)
              .then(changedPassword => {
                if(changedPassword){
                  if(changedPassword[0] ===1){
                    return res.status(200).json({message:'password changed successfully'}); 
                  }else{
                    return res.status(404).json({message:'error in changing password'}); 
                  }
                }else{
                  return res.status(404).json({message:'error in changing password'}); 
                }
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              })
            }else{
              return res.status(400).json({message:'New Password and Confirm Password must be same'});
            }
          }else{
            return res.status(400).json({message:'Incorrect old password'});
          }
        }else{
          return res.status(404).json({message:'user not found'});
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error });
      })
    }else{
      return res.status(400).json({message:'proper input not found in request'});
    }
  };
}