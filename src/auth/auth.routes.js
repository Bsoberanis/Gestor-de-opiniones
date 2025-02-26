import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateFields } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/login', [
    check('identifier').notEmpty().withMessage('Please enter your username or email.'),
    check('password').notEmpty().withMessage('The password is mandatory.'),
    validateFields
], login);

export default router;