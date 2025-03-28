import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    username : {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password : {
        type : String,
        required: true
    }
});

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    balance : {
        type : Number,
        required: true,
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Account =  mongoose.models.Account || mongoose.model('Account', accountSchema);