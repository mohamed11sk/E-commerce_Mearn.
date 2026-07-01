import { NextFunction,Request, Response} from "express";
import  Jwt  from "jsonwebtoken";
import userModel from "../model/Usermodel.js";
import { ExtendRequest } from "../types/extendReqest.js";

const validationJwt=(req:ExtendRequest,res:Response,next:NextFunction)=>{
    const Tokenheader = req.get('Authorization');
    if(!Tokenheader){
       res.status(403).send("Token  header not found ");
       return;
    }
    const token = Tokenheader.split(" ")[1];
    if(!token){
          res.status(4003).send("token in valid ");
    }
    Jwt.verify(token ,process.env.SCRET_KEY || "", async(err,payload)=>{
        if(err){
              res.status(403).send("invalid token");
               return;
        }
        if(!payload){
             res.status(403).send("invalid token payload");
              return;
        }
       const userpayload = payload as {
        name:string;
        email:string;
        pass:string;
       } ;

        const user = await userModel.findOne({email :userpayload.email })
        req.user=user;
        next();
    })
    
    


}
export default validationJwt;