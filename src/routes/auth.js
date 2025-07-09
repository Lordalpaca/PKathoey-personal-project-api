import express from "express";
import { loginSchema, registerSchema, validate } from "../validations/validators.js";
import { login, register } from "../controllers/auth.js";

const authRouter = express.Router();

//ENDPOINT http://localhost:8888/auth/register
authRouter.post("/register", validate(registerSchema), register);

//ENDPOINT http://localhost:8888/auth/login
authRouter.post("/login", validate(loginSchema), login);

export default authRouter;