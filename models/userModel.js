import { Schema, model } from 'mongoose';

const userSchema = Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        validate: function (value) {
            const idReg = "^[a-zA-Z0-9]{7}$";
            return value.match(idReg);
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
        // validate: function (value) {
        //     const passReg = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8}$";
        //     return value.match(passReg);
        // }
    },
    email: {
        type: String,
        required: true,
        validate: function (value) {
            const emailReg = "^[a-zA-Z0-9+_.-]+(@(gmail|yahoo).com){1}$";
            return value.match(emailReg);
        }
    },
    phone: {
        type: String,
        required: true,
        validate: function (value) {
            const phoneReg = "^[6-9]{1}[0-9]{9}$";
            return value.match(phoneReg);
        }
    },

    gender: {
        type: String,
        required: true,
        validate: function (value) {
            const genderReg = "^(male|female)$";
            return value.match(genderReg);
        }
    },

    address: {
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
            required: true,
            validate: function (value) {
                const cityReg = "^[a-zA-Z]{3,}$";
                return value.match(cityReg);
            }
        },
        state: {
            type: String,
            required: true,
            validate: function (value) {
                const stateReg = "^[a-zA-Z]{3,}$";
                return value.match(stateReg);
            }
        },
        pincode: {
            type: String,
            required: true,
            validate: function (value) {
                const pincodeReg = "^[0-9]{6}$";
                return value.match(pincodeReg);
            }
        }
    }

});

const userData = model('userData', userSchema);
export default userData;
