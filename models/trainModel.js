import { Schema, model } from 'mongoose';

const trainSchema = Schema({
    trainNo: {
        type: String,
        required: true,
        validate: function (value) {
            const trainNoReg = "^[0-9]{5}$";
            return value.match(trainNoReg);
        }
    },
    trainName: {
        type: String,
        required: true,
        validate: function (value) {
            const nameReg = "^[A-Z][a-z0-9]{1,}\\s[A-Z][a-z0-9]{1,}$"
            return value.match(nameReg);
        }
    },
    sourceStation: {
        type: String,
        required: true,
        validate: function (value) {
            const srcReg = "^[a-zA-Z]{3,}$";
            return value.match(srcReg);
        }
    },
    destinationStation: {
        type: String,
        required: true,
        validate: function (value) {
            const dstReg = "^[a-zA-Z]{3,}$";
            return value.match(dstReg);
        }
    },
    runsOn: {
        type: Array,
        required: true,
        validate: function (value) {
            for (const element of value) {
                if (element < 1 || element > 7) {
                    return false;
                }
            }
            return true;
        }
    }
});

const trainData = model('trainData', trainSchema);
export default trainData;
