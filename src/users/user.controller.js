import bcryptjs from 'bcryptjs';
import User from './user.model.js';

const userPost = async (req, res) => {
    try {
        const { username, mail, password, firstname, lastname } = req.body;

        // Verificar si el usuario o correo ya existen
        const existingUser = await User.findOne({ $or: [{ username }, { mail }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Crear nuevo usuario
        const user = new User({ username, mail, password, firstname, lastname });

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Guardar en base de datos
        await user.save();
        console.log('User registered successfully');

        // Responder con datos sin la contraseña
        res.status(201).json({
            userData: {
                username: user.username,
                mail: user.mail,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const userPut = async (req, res) => {
    try {
        const userId = req.user._id;
        const { _id, password: newPassword, ...userUpdate } = req.body;

        // Si se envía una nueva contraseña, encriptarla
        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            userUpdate.password = bcryptjs.hashSync(newPassword, salt);
        }

        // Actualizar usuario y obtener el objeto actualizado
        const updatedUser = await User.findByIdAndUpdate(userId, userUpdate, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Responder sin incluir la contraseña
        res.status(200).json({
            msg: 'Successfully updated',
            user: {
                username: updatedUser.username,
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname
            }
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Exportar funciones
export { userPost, userPut };
