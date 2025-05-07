import express from "express";
import { RegisterUser, SignIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/RegisterUser", RegisterUser);

router.post("/SignIn", SignIn);

export default router;
