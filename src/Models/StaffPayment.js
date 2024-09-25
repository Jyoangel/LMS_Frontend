const mongoose = require('mongoose');
const { Schema } = mongoose;

const staffPaymentSchema = new Schema({
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'StaffDetail',
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

const StaffPayment = mongoose.model('StaffPayment', staffPaymentSchema);

module.exports = StaffPayment;
