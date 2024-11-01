import { Router } from "express";
import out from "../controllers/handlePlayers.js";
const router=Router();
router.route('/out').post(out);
export default router
