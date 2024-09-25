const mongoose = require('mongoose');
const { Schema } = mongoose;

const parentSchema = new Schema({
    fatherName: {
        type: String,
        required: true
    },
    fatherContactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    fatherAadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherContactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    motherAadharNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    motherOccupation: {
        type: String,
        required: true
    },
    annualIncome: {
        type: Number,
        required: true
    },
    parentAddress: {
        type: String,
        required: true
    }
}, { _id: false });

module.exports = parentSchema;
