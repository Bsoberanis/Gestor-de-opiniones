import Posts from '../posts/posts.model.js';

const existingPost = async (id = '') => {
    const post = await Posts.findById(id);
    if (!post) {
        throw new Error(`Post with ID ${id} not found`);
    }
};

// Exporta la validación de existencia de post
export { existingPost };
