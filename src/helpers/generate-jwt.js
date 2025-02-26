import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error('Error generating token:', err);
                    reject(new Error('Token could not be generated'));
                } else {
                    resolve(token);
                }
            }
        );
    });
};
