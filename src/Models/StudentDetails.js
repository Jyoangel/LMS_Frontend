const mongoose = require('mongoose');
const { Schema } = mongoose;
const parentSchema = require('./Parent');
const localGuardianSchema = require('./LocalGuardian');

const studentSchema = new Schema({
    studentID: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true
    },
    formNumber: {
        type: String,
        required: [true, 'Form number is required']
    },
    admissionNumber: {
        type: String,
        required: [true, 'Admission number is required']
    },
    class: {
        type: String,
        required: [true, 'Class is required']
    },
    admissionType: {
        type: String,
        required: [true, 'Admission type is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required']
    },
    motherTongue: {
        type: String,
        required: [true, 'Mother tongue is required']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required'],
        set: (value) => {
            // Ensure only the date part is stored without time
            return new Date(value.toISOString().split('T')[0]);
        }
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['Male', 'Female', 'Other']
    },
    religion: {
        type: String,
        required: [true, 'Religion is required']
    },
    caste: {
        type: String,
        required: [true, 'Caste is required']
    },
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required']
    },
    aadharNumber: {
        type: String,
        required: [true, 'Aadhar number is required'],
        unique: true,
        match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhar number']
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required'],
        match: [/^\d{10}$/, 'Please enter a valid 10-digit contact number']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    parent: {
        type: parentSchema,
        required: [true, 'Parent information is required']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('StudentDetail', studentSchema);
