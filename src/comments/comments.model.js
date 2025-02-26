import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    text: {
        type: String,
        required: [true, "Comment text is required"],
        trim: true,
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
