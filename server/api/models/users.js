import Mongoose from "mongoose";

/**
 * Schema for User collection in mongo db
 */
const UserSchema = new Mongoose.Schema({
    // id:{
    //     type:String
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        // required: true
    },
},
    {
        versionKey: false
    });

// UserSchema.virtual('id', () => this._id.toHexString());

UserSchema.set('toJSON', { virtuals: true });


const User = Mongoose.model('User', UserSchema);

export default User;