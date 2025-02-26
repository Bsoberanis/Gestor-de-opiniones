import User from '../users/user.model.js';
import zxcvbn from 'zxcvbn';

const emailExists = async (email = '') => {
    const user = await User.findOne({ mail: email });
    if (user) {
        throw new Error(`Email "${email}" is already registered. Choose another.`);
    }
};

const userNameExists = async (username = '') => {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error(`Username "${username}" is not available.`);
    }
};

const validatePassword = (password = '') => {
    const result = zxcvbn(password);

    if (result.score < 2) {
        throw new Error('The password is not safe enough.');
    }
    if (password.length < 6) {
        throw new Error('The password must be at least 6 characters.');
    }
};

const existUserById = async (id = '') => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User with ID "${id}" does not exist.`);
    }
};

// Exporta las validaciones de usuario
export { emailExists, userNameExists, validatePassword, existUserById };
