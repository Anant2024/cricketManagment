import { Router } from "express";
import { ConnectedUser } from "../controllers/connectedaccount.js";
const router=Router()
router.route('/connectedUser').post(ConnectedUser)
router.route('/StripeConnection').post(StripeConnecting)
export default router 
