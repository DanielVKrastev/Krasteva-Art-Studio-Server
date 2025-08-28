import jwt from 'jsonwebtoken';
import { JWT_SECRET }  from '../constants-config.js';

export const generateToken = (user: any) => {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    return token;
}