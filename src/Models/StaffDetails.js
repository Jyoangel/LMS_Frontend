const mongoose = require('mongoose');
const { Schema } = mongoose;
const emergencyContactSchema = require('./EmergencyContact');

const staffSchema = new Schema({
    staffID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
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
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    education: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    position: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: emergencyContactSchema,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    languageSpoken: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Staff = mongoose.model('StaffDetail', staffSchema);

module.exports = Staff;

