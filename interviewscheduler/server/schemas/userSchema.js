import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    name: { type: String }
});

const User = mongoose.model('Users', userSchema);
export default User;
