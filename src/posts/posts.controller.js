import Posts from './posts.model.js';
import Comment from '../comments/comments.model.js';

const createPosts = async (req, res) => {
    const userId = req.user._id;
    const { title, category, text } = req.body;

    try {
        const post = new Posts({ title, category, text, author_id: userId });
        await post.save();

        res.status(201).json({ post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updatePosts = async (req, res) => {
    const { id } = req.params;
    const { _id, author_id, ...rest } = req.body;

    try {
        const post = await Posts.findByIdAndUpdate(id, rest, { new: true }).lean();

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ post });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Posts.findByIdAndUpdate(id, { state: false }, { new: true }).lean();

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", post });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const feedPost = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    const query = { state: true };

    try {
        const [total, posts] = await Promise.all([
            Posts.countDocuments(query),
            Posts.find(query)
                .skip(Number(offset))
                .limit(Number(limit))
                .lean()
        ]);

        res.status(200).json({
            total,
            posts: posts.map(post => ({
                _id: post._id,
                title: post.title,
                creation_date: post.creation_date.toISOString().split('T')[0],
            }))
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const postDetails = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Posts.findById(postId).populate('author_id', 'username').lean();
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comments = await Comment.find({ postId, status: true })
            .populate('author_id', 'username')
            .lean();

        res.status(200).json({
            post: {
                title: post.title,
                category: post.category,
                text: post.text,
                author: post.author_id.username,
                creation_date: post.creation_date.toISOString().split('T')[0],
            },
            comments: comments.map(comment => ({
                id: comment._id,
                comment: comment.text,
                author: comment.author_id.username,
            }))
        });
    } catch (error) {
        console.error("Error fetching post details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Exportar controladores
export { createPosts, updatePosts, deletePost, feedPost, postDetails };
