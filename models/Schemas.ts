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

const transactionSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    amount : {
        type : Number,
        required: true,
        min: 0
    },
    date : {
        type : Date,
        default: Date.now
    }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Account =  mongoose.models.Account || mongoose.model('Account', accountSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);