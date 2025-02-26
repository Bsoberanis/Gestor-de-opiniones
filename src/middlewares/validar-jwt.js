import jwt from 'jsonwebtoken';
import User from '../users/user.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ msg: "No token provided in the request" });
    }

    try {
        // Verificación del token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Obtener el usuario correspondiente al uid
        const user = await User.findById(uid);

        // Verificar que el usuario existe y está activo
        if (!user || !user.status) {
            return res.status(401).json({
                msg: !user ? 'User not found in the database' : 'Invalid token - user is disabled',
            });
        }

        // Almacenar el usuario en la request para su uso en los siguientes middlewares
        req.user = user;
        next();
    } catch (error) {
        console.error(`JWT validation error: ${error.message}`);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};
