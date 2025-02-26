import { validationResult } from "express-validator";
import Posts from "../posts/posts.model.js";
import Comments from "../comments/comments.model.js";

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateAuthorToPost = async (req, res, next) => {
    const { id: postId } = req.params;
    const { id: userId } = req.user;

    try {
        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author_id.toString() !== userId) {
            return res.status(403).json({ error: 'You are not the author of this post' });
        }

        req.post = post;
        next();
    } catch (error) {
        console.error(`Error validating post author: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const validateAuthorToComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { id: userId } = req.user;

    try {
        const comment = await Comments.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.author_id.toString() !== userId) {
            return res.status(403).json({ error: 'You are not the author of this comment' });
        }

        req.comment = comment;
        next();
    } catch (error) {
        console.error(`Error validating comment author: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exporta las funciones del middleware que valida campos
export { validateFields, validateAuthorToPost, validateAuthorToComment };
