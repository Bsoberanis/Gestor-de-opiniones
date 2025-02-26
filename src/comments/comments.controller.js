import Comment from './comments.model.js';
import Posts from '../posts/posts.model.js';
import User from '../users/user.model.js';

const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        const post = await Posts.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }

        const comment = await Comment.create({ postId, text, author_id: userId });

        const [postAuthor, commentAuthor] = await Promise.all([
            User.findById(post.author_id),
            User.findById(comment.author_id)
        ]);

        const data = {
            post: {
                title: post.title,
                category: post.category,
                text: post.text,
                author: postAuthor?.username || "Unknown",
                creation_date: new Date(post.creation_date).toISOString().split('T')[0],
            },
            comment: {
                comment: comment.text,
                author: commentAuthor?.username || "Unknown",
            }
        };

        res.status(201).json({ data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findByIdAndUpdate(commentId, { status: false }, { new: true });

        if (!comment) {
            return res.status(404).json({ msg: "Comment not found." });
        }

        res.status(200).json({
            msg: "Comment was successfully deleted",
            comment,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { _id, author_id, ...rest } = req.body;

        const updatedComment = await Comment.findByIdAndUpdate(commentId, rest, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ msg: "Comment not found." });
        }

        res.status(200).json({ comment: updatedComment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Export functions
export { createComment, deleteComment, updateComment };
