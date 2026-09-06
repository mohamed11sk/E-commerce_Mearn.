import mongoose from "mongoose";
import userModel from "../model/Usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import orderModel from "../model/ordermodel.js";

export interface params {
  name: string;
  email: string;
  pass: string;
}

export const register = async ({ name, email, pass }: params) => {
  const finduser = await userModel.findOne({ email });
  if (finduser) {
    return { data: "User alady exaist", statuscode: 400 };
  }
  const hashpass = await bcrypt.hash(pass, 10);
  const newuser = new userModel({ name, email, pass: hashpass });
  await newuser.save();
  return { data: generateJWT({ name:name, email:email, pass:pass }), statuscode: 200 };
};

interface patamslogin {
  email: string;
  pass: string;
}

export const login = async ({ email, pass }: patamslogin) => {
  const finduser = await userModel.findOne({ email });
  if (!finduser) {
    return { data: "user not found", statuscode: 400 };
  }
  // const matchpass = pass === finduser.pass;
  const isMatch = await bcrypt.compare(pass, finduser.pass);
  if (!isMatch) {
    return { data: "user not found", statuscode: 400 };
  }
  return {
    data: generateJWT({ email: finduser.email, pass: finduser.pass }),
    statuscode: 200,
  };
};
interface getorderparam {
  Userid:string;
}

export const getorder = async ({ Userid }: getorderparam) => {
try{  

    return { data: await orderModel.find({ Userid }), statuscode: 200 };}catch (err){
  throw err;
}
  
  
};


const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.SCRET_KEY || "");
};
