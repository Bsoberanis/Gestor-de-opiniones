import bcrypt from 'bcryptjs';
import User from '../users/user.model.js';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({ 
            $or: [{ mail: identifier }, { username: identifier }] 
        });

        if (!user || !user.status) {
            return res.status(400).json({
                msg: "Invalid credentials. User not found or inactive.",
            });
        }

        // Verificar contraseña
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                msg: "Incorrect password.",
            });
        }

        // Generar JWT
        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: "Login successful",
            user: { username: user.username, mail: user.mail },
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Please contact the administrator." });
    }
};
