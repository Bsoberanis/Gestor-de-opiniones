import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validateAuthorToPost } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost } from "../helpers/posts-validations.js";
import { createPosts, updatePosts, deletePost, feedPost, postDetails } from "./posts.controller.js";

const router = Router();

router.get('/', feedPost);

router.get('/:postId',
    [
        check("postId", "Invalid MongoDB ID").isMongoId(),
        check("postId").custom(existingPost),
        validateFields,
    ], postDetails
);

router.post('/',
    validarJWT,
    [
        check("title", "Title is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("text", "Text is required").not().isEmpty(),
        validateFields,
    ], createPosts
);

router.put('/:id', validarJWT,
    [
        check("id", "Invalid MongoDB ID").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthorToPost,
    ], updatePosts
);

router.delete('/:id', validarJWT,
    [
        check("id", "Invalid MongoDB ID").isMongoId(),
        check("id").custom(existingPost),
        validateFields,
        validateAuthorToPost,
    ], deletePost
);

export default router;
