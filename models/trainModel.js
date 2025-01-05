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
            for (let i = 0; i < value.length; i++) {
                if (value[i] < 1 || value[i] > 7) {
                    return false;
                }
            }
            return true;
        }
    }
});

var trainData = model('trainData', trainSchema);
export default trainData;
