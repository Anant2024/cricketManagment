import { Router } from "express";
import { login } from "../controllers/loginlogout.js";
import {logout}  from "../controllers/loginlogout.js"
import { verifyJWT}  from "../middlewares/auth.js";
const router=Router()
router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)
export default router