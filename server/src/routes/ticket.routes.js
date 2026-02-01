import express from "express";
import {
  claimTicket,
  createTicket,
  getMyTickets,
  getPendingTickets,
  resolveTicket,
} from "../controllers/ticket.controller.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { validateBody } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/create", protect, allowRoles("student"), validateBody(["title", "description"]), createTicket);

router.get("/pending", protect, allowRoles("mentor", "admin"), getPendingTickets);

router.get("/my", protect, allowRoles("mentor"), getMyTickets);

router.patch("/claim/:id", protect, allowRoles("mentor"), claimTicket);

router.patch("/resolve/:id", protect, allowRoles("mentor"), resolveTicket);

export default router;
