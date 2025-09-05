import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            unique: true
        },

        password:
        {
            type:String
        }
    }
);

const userModel=mongoose.model('Users',userSchema);
export default userModel;