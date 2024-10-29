import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
export const verifyJWT= async(req,res,next)=>{
  try {
      const logoutToken=await req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
  
      if(!logoutToken){
          console.log("error while accessing the cookies for logout")
  
      }
      const decodedlogouttoken=jwt.verify(logoutToken,process.env.ACCESS_TOKEN_SECRET)
     const user= await User.findById(decodedlogouttoken?._id).select("-password -refreshToken")
      if(!user){
          console.log("invalid accesstoken for logout")
  
      }
      req.user=user;
      next();
  } catch (error) {
    console.log(error,"error while logout")
  }
}