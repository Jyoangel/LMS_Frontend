const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',  // Assuming 'Student' is your student model
        required: true
    },
    present: {
        type: Boolean,
        required: true,
        default: false  // Sets the default value of 'present' to false
    },
    date: {
        type: Date,
        default: Date.now  // Automatically sets to the current date when the record is created
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
