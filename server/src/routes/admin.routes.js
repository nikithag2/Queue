import express from "express";
import { getAnalytics } from "../controllers/admin.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/analytics", protect, allowRoles("admin"), getAnalytics);

export default router;
