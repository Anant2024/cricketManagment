// import { UserConnected } from "../models/ConnectedStripe.js";
// import Stripe from 'stripe';

// // Use your actual Stripe secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const ConnectedUser = async (req, res) => {
//     const { username, email, phoneNo, address } = req.body;
//     try {
//         const existingUser = await UserConnected.findOne({ $or: [{ username }, { email }, { phoneNo }] });
//         if (existingUser) {
//             return res.status(400).send("Username, email, and phone number need to be unique.");
//         }

//         // Creating Stripe Account
//         const stripeAccount = await stripe.accounts.create({
//             type: 'express', // Account type should be specified
//             business_type: 'individual', // or 'company', adjust as needed
//             country: 'IN', // Set the country to India
//             email: email,
//             capabilities: {
//                 card_payments: { requested: true },
//                 transfers: { requested: true },
//                 upi_payments: { requested: true },
//             },
//             // Additional information required for Indian accounts
//             business_profile: {
//                 mcc: '7399', // Adjust based on your business type
//                 name: username, // Name associated with the account
//                 //product_description: 'Your product description', // Description of the product or service
//                 support_email: email,
//                 support_phone: phoneNo,
//                 //support_url: 'https://your-website.com', // Replace with your actual support URL
//             }
//         });

//         // Creating and Saving User Details
//         const details = new UserConnected({
//             username,
//             email,
//             phoneNo,
//             address,
//             stripeAccountId: stripeAccount.id // Save the ID of the newly created Stripe account
//         });
//         await details.save();

//         console.log('Account created:', details);

//         return res.send("Details saved.");
//     } catch (error) {
//         console.error("Error while setting the details of connected user:", error);
//         return res.status(500).send("Something went wrong while setting the details of connected user.");
//     }
// };

// export { ConnectedUser };


import { UserConnected } from "../models/ConnectedStripe.js";
import Stripe from 'stripe';

// Use your actual Stripe secret key
//https://docs.stripe.com/connect/separate-charges-and-transfers
const stripe = new Stripe("sk_test_51PbLIDJjA0Yjw1xFeGvqXONuQkRIshBo3gFlIIeTQngOpEjl64MHpsgnwD4dtC0qxC8LqtHcW5tRIGMB2iD06o0b00O1SRxvLq");

const ConnectedUser = async (req, res) => {
    const { username, email, phoneNo, address } = req.body;
    try {
        const existingUser = await UserConnected.findOne({ $or: [{ username }, { email }, { phoneNo }] });
        if (existingUser) {
            return res.status(400).send("Username, email, and phone number need to be unique.");
        }

        // Creating Stripe Account
        const stripeAccount = await stripe.accounts.create({
            type: 'express', // Account type should be specified
            business_type: 'individual', // or 'company', adjust as needed
            country: 'IN', // Set the country to India
            email: email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
                upi_payments: { requested: true },
            },
            // Additional information required for Indian accounts
            business_profile: {
                mcc: '7399', // Adjust based on your business type
                name: username, // Name associated with the account
                //product_description: 'Your product description', // Description of the product or service
                support_email: email,
                support_phone: phoneNo,
                //support_url: 'https://your-website.com', // Replace with your actual support URL
            }
        });

        // Creating and Saving User Details
        const details = new UserConnected({
            username,
            email,
            phoneNo,
            address,
            stripeAccountId: stripeAccount.id // Save the ID of the newly created Stripe account
        });
        await details.save();

        console.log('Account created:', details);

        return res.send("Details saved.");
    } catch (error) {
        console.error("Error while setting the details of connected user:", error);

        if (error.type === 'StripeInvalidRequestError' && error.raw && error.raw.message === 'You cannot create new accounts because your account has been rejected.') {
            return res.status(400).send("Cannot create new accounts because your Stripe account has been rejected. Please contact Stripe support.");
        }

        return res.status(500).send("Something went wrong while setting the details of connected user.");
    }
};

export { ConnectedUser };

