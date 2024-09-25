const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentTeacherSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'TeacherDetail',
        required: true
    },
    assignedClass: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Due'],
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    },
    dueAmount: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('PaymentTeacher', paymentTeacherSchema);
