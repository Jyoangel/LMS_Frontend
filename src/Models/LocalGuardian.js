const mongoose = require('mongoose');
const { Schema } = mongoose;

const localGuardianSchema = new Schema({
    guardianName: {
        type: String,
        required: true
    },
    relationWithStudent: {
        type: String,
        required: true
    },
    guardianContactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    guardianAadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    guardianOccupation: {
        type: String,
        required: true
    },
    guardianAddress: {
        type: String,
        required: true
    }
}, { _id: false });

module.exports = localGuardianSchema;