import { Schema, model } from 'mongoose';

const userSchema = Schema({
    userId: {
        type: String,
        required: true,
        validate: function (value) {
            return value.length == 7;
        }
    },
    userName: {
        type: String,
        required: true,
        validate: function (value) {
            const nameReg = "^[A-Z][a-z]{1,}\\s[A-Z][a-z]{1,}$"
            return value.match(nameReg);
        }
    },
    password: {
        type: String,
        required: true,
        validate: function (value) {
            const passReg = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8}$";
            return value.match(passReg);
        }
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
});

var userData = model('userData', userSchema);
export default userData;
