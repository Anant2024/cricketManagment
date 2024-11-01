import mongoose from "mongoose";

// Define the schema for user
const userSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    phoneNo:{
        unique:true,
        type:Number,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Other user details
   
    // Stripe account details
    stripeAccountId: {
        type: String,
        default: null
    },
   
});



// Define the model for User
export const UserConnected = mongoose.model('UserConnected', userSchema);




