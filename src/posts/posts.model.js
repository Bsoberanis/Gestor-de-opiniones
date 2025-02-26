import mongoose from 'mongoose';

const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    creation_date: {
        type: Date, default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    },
});

export default mongoose.model('Posts', PostsSchema);