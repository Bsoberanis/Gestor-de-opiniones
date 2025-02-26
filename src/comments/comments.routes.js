import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validateFields, validateAuthorToComment } from "../middlewares/validar-campos.js";
import { existingPost } from "../helpers/posts-validations.js";
import { existingComment } from "../helpers/comment-validations.js";
import { createComment, deleteComment, updateComment } from "./comments.controller.js";

const router = Router();

// Middleware común para validar IDs
const validateMongoId = (param) => check(param, "Invalid MongoDB ID format").isMongoId();

router.post(
    "/:postId",
    validarJWT,
    [validateMongoId("postId"), check("postId").custom(existingPost), validateFields],
    createComment
);

router.delete(
    "/:commentId",
    validarJWT,
    [validateMongoId("commentId"), check("commentId").custom(existingComment), validateFields, validateAuthorToComment],
    deleteComment
);

router.put(
    "/:commentId",
    validarJWT,
    [validateMongoId("commentId"), check("commentId").custom(existingComment), validateFields, validateAuthorToComment],
    updateComment
);

export default router;
