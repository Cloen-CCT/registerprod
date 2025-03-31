// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 3
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /.+\@.+\..+/
//     },
//     phone: {
//         type: String,
//         required: false
//     },
//     rol: {
//         type: String,
//         required: false
//     },
//     birthDate: {
//         type: Date,
//         required: false
//     },
//     deleted: {
//         type: Boolean,
//         default: false
//     },
//     confirmed: {
//         type: Boolean,
//         default: false
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// }, { collection: 'users' });

// export default mongoose.model('User', UserSchema);


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
}, { collection: 'users' });

export default mongoose.model('User', UserSchema);
