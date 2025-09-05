import express from 'express';
import user from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await user.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        if (!existingUser) {
            const newUser = new user({ username, password: hashedPassword });
            await newUser.save();
            res.status(200).json({ success: true });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default router;