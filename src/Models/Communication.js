const mongoose = require('mongoose');
const { Schema } = mongoose;

const communicationSchema = new Schema({
    studentID: {
        type: String,
        required: true,
        ref: 'StudentDetail'
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    aadharNumber: {
        type: String,
        required: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    fatherName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    selected: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Communication', communicationSchema);
