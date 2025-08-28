import bcrypt from 'bcrypt';

import Admin from '../models/admin-model.js';
import { generateToken } from '../utils/auth-unils.js';

export default {
    async login(email: string, password: string) {
        const user = await Admin.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const accessToken = generateToken(user);

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        return { _id: user._id, accessToken: accessToken, email: user.email, username: user.username };
    },
    async getAll() {
        const users = await Admin.find().sort({ _id: -1 });
        return users;
    },
    async getOne(userId: string) {
        const user = await Admin.findOne({ _id: userId });
        return user;
    },
    async delete(userId: string) {
        return await Admin.findByIdAndDelete(userId);
    },
    async update(userId: string, updateData: {email: string}) {
        const user = await this.getOne(userId);

        if (user && updateData.email !== user.email) {
            const userEmail = await Admin.find({ email: updateData.email });

            if (userEmail.length > 0) {
                throw new Error('This email is already taken');
            }
        }

        const accessToken = generateToken({ _id: userId, ...updateData });
        const updatedUser = await Admin.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        const result = { ...updatedUser, accessToken};

        return result;
    },
}
