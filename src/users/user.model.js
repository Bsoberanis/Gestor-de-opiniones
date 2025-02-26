import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    mail: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'] // Validación de email
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'] // Seguridad básica
    },
    firstname: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    strict: true // Evita campos no definidos
});

export default mongoose.model('User', UserSchema);
