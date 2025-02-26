import Comment from '../comments/comments.model.js';

const existingComment = async (id = '') => {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error(`Comment with ID ${id} not found`);
    }
};

// Exporta la validación si el comentario existe
export { existingComment };
