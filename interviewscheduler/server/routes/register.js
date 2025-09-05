import express from 'express';
import User from '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Email and password required" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, name });
        res.status(201).json({ success: true, message: "User registered successfully", user: { id: newUser._id, email: newUser.email } });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
});

export default router;
