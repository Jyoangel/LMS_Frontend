

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const liveRoomSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true }
});


const liveClassSchema = new Schema({
    topic: { type: String, required: true, minlength: 5 },
    section: { type: String, required: true },
    liveRoom: {
        type: liveRoomSchema,
        required: true
    },
    date: { type: Date, required: true },
    time: {
        type: String, required: true, validate: {
            validator: function (v) {
                return /\d{2}:\d{2}/.test(v); // Validates time in HH:MM format
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    duration: {
        type: String, required: true, validate: {
            validator: function (v) {
                return /\d+h \d+m/.test(v); // Validates duration in Xh Ym format
            },
            message: props => `${props.value} is not a valid duration format!`
        }
    },
    noteToStudents: { type: String, required: true, maxlength: 500 }
}, {
    timestamps: true
});

module.exports = mongoose.model('LiveClass', liveClassSchema);
