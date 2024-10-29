import { Router } from "express";
import { description } from "../controllers/description.js"; // Import the description function
const router = Router();

router.route('/description').post(description);

export default router;
