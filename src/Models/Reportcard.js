const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    marks: { type: Number, required: true },
});

const reportCardSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    session: { type: String, required: true },
    rollNumber: { type: String, required: true },
    class: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    numberOfSubjects: { type: Number, required: true },
    subjects: [subjectSchema],
    classTeacher: { type: String, required: true },
    principleSignature: { type: String, required: true },
    status: { type: String, enum: ['Pass', 'Fail'], required: true, default: 'Fail' }, // Add status field
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual for percentage
reportCardSchema.virtual('percentage').get(function () {
    const totalMarks = this.subjects.reduce((acc, subject) => acc + subject.marks, 0);
    return (totalMarks / (this.numberOfSubjects * 100)) * 100;
});

// Pre-save hook to set status based on percentage
reportCardSchema.pre('save', function (next) {
    const percentage = this.percentage;
    this.status = percentage >= 33 ? 'Pass' : 'Fail';
    next();
});

module.exports = mongoose.model('ReportCard', reportCardSchema);
