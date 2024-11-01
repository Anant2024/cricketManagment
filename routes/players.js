import { Router } from "express";
import { createPlayers } from "../controllers/playersController.js";
const router=Router();
router.route('/savePlayers').post(createPlayers)
export default router