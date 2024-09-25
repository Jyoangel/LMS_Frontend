const mongoose = require('mongoose');
const { Schema } = mongoose;
const numberToWords = require('number-to-words');

const feeSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'StudentDetail',
        required: true
    },
    totalFee: {
        type: Number,
        required: true
    },
    monthlyFee: {
        type: Number,
        required: true
    },
    festiveFee: {
        type: Number
    },
    total: {
        type: Number,
    },
    paidAmount: {
        type: Number,
        required: true,
        default: function () {
            return this.monthlyFee + (this.festiveFee || 0);
        }
    },
    dueAmount: {
        type: Number,
        required: true,
        default: function () {
            return this.totalFee - this.paidAmount;
        }
    },
    feeMonth: {
        type: String,
        required: true,
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    receiptNo: {
        type: Number,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Due', 'Paid'],
        default: 'Due'
    },
    registrationNo: {
        type: String
    },
    number: {
        type: String
    },
    schoolEmail: {
        type: String
    },
    session: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    amountInWords: {
        type: String
    },
    paymentMode: {
        type: String
    },
    referenceNo: {
        type: String
    },
    bankName: {
        type: String
    },
    remark: {
        type: String
    },
    printDate: {
        type: Date,
        default: Date.now
    },
    receiptBy: {
        type: String
    },
    srNo: {
        type: Number
    }
}, { timestamps: true });

// Calculate total based on MonthlyFee and festiveFee
feeSchema.pre('save', async function (next) {
    const doc = this;

    if (doc.isNew) {
        try {
            console.log('New document - generating receiptNo and srNo');
            const lastFee = await Fee.findOne().sort({ receiptNo: -1 });
            console.log('Last fee found:', lastFee);

            if (lastFee) {
                doc.receiptNo = lastFee.receiptNo + 1;
            } else {
                doc.receiptNo = 1;
            }

            // Calculate total based on MonthlyFee and festiveFee
            doc.total = doc.monthlyFee + (doc.festiveFee || 0);

            // Calculate due amount and determine status
            doc.dueAmount = doc.totalFee - doc.paidAmount;
            doc.status = doc.dueAmount <= 0 ? 'Paid' : 'Due';

            // Convert paidAmount to words
            doc.amountInWords = numberToWords.toWords(doc.paidAmount) + ' only';

            // Calculate srNo dynamically
            const lastSrNoFee = await Fee.findOne().sort({ srNo: -1 });
            doc.srNo = lastSrNoFee ? lastSrNoFee.srNo + 1 : 1;

            console.log('New fee with receiptNo and srNo:', doc);
            next();
        } catch (err) {
            console.error('Error in pre save:', err);
            next(err);
        }
    } else {
        next();
    }
});

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
