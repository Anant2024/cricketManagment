import { UserConnected } from "../models/ConnectedStripe.js";
import Stripe from 'stripe';
const stripe =new stripe ()
const StripeConnecting=async()=>{
   const em=req.body
   const user =await UserConnected.findOne({email});
   if(!user){
      console.log("Incorrect information while registering connected user to stripe , onboarding process");
   }
   const accountId=user.stripeAccountId

}

export {StripeConnecting}