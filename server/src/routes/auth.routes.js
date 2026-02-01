import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/register", validateBody(["name", "email", "password"]), registerUser);
router.post("/login", validateBody(["email", "password"]), loginUser);

export default router;
