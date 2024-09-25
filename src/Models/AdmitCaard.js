const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ExamSubject schema
const ExamSubjectSchema = new Schema({
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true
    },
    examination_date: {
        type: Date,
        required: [true, 'Examination date is required'],

    }
});

// AdmitCard schema
const AdmitCaardSchema = new Schema({
    examination_roll_number: {
        type: String,
        required: [true, 'Examination roll number is required'],
        trim: true,
        unique: true,
        minlength: [5, 'Examination roll number must be at least 5 characters long']
    },
    school_name: {
        type: String,
        required: [true, 'School name is required'],
        trim: true
    },
    session: {
        type: String,
        required: [true, 'Session is required'],
        trim: true
    },
    examination: {
        type: String,
        required: [true, 'Examination is required'],
        trim: true
    },
    student_name: {
        type: String,
        required: [true, 'Student name is required'],
        trim: true
    },
    class: {
        type: String,
        required: [true, 'Class name is required'],
        trim: true
    },
    startdate: {
        type: Date,
        required: [true, 'Start date is required'],

    },
    enddate: {
        type: Date,
        required: [true, 'End date is required'],

    },
    examstarting_time: {
        type: String,
        required: [true, 'Exam starting time is required'],

    },
    examending_time: {
        type: String,
        required: [true, 'Exam ending time is required'],

    },
    examsubjects: {
        type: [ExamSubjectSchema],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: 'At least one exam subject is required'
        }
    }
});

// Create model from schema
const AdmitCaard = mongoose.model('AdmitCaard', AdmitCaardSchema);

module.exports = AdmitCaard;