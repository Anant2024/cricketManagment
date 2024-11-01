import { UserConnected } from "../models/ConnectedStripe";
import stripe from 'stripe';

const Accounts= async (req,res)=>{
    const {api,name}=req.body
    const stripeInstance=stripe(api)
    try{
        const account=await stripeInstance.accounts.create({
            type:'express',
        });
        if(account){
           
            const existingUser=await UserConnected.findOneAndUpdate(
             { username:name},
             {stripeAccountId:account},
             {new:true}
            )
           
        }
        res.status(200).json({account});
    }
    catch(error){
        console.log("Error while creating connected account",error);
        res.status(500).json({error:'Internal server error'});
    }
}

const AccountLink=async (req,res)=>{
    
}