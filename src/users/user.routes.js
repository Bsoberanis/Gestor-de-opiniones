import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { emailExists, userNameExists, validatePassword } from "../helpers/user-validations.js";
import { userPost, userPut } from "./user.controller.js";

const router = Router();

router.put(
    '/',
    validarJWT,
    [
        check("username")
            .trim()
            .not().isEmpty().withMessage("Username is required")
            .custom(userNameExists),
        check("password").custom(validatePassword),
        check("firstname")
            .trim()
            .not().isEmpty().withMessage("First name is required"),
        check("lastname")
            .trim()
            .not().isEmpty().withMessage("Last name is required"),
        validateFields,
    ],
    userPut
);

router.post(
    "/",
    [
        check("username")
            .trim()
            .not().isEmpty().withMessage("Username is required")
            .custom(userNameExists),
        check("mail")
            .trim()
            .isEmail().withMessage("Invalid email format")
            .custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname")
            .trim()
            .not().isEmpty().withMessage("First name is required"),
        check("lastname")
            .trim()
            .not().isEmpty().withMessage("Last name is required"),
        validateFields,
    ],
    userPost
);

export default router;
