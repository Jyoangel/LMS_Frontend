const mongoose = require('mongoose');

const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'p:m' : 'a:m';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
};


const assignmentSchema = new mongoose.Schema({
    assignmentCode: { type: String, required: true },
    assignmentTitle: { type: String, required: true },
    dueDate: { type: Date, required: true },
    attachments: { type: String, required: true },
    submissionMethod: { type: String, required: true },
    marks: { type: Number, required: true },
    additionalInstruction: { type: String, required: true },
    class: { type: String, required: true },
    assignTo: { type: String, required: true },
    courseDescription: { type: String, required: true },
    date: { type: Date, default: () => new Date() },
    time: { type: String, default: getCurrentTime },
    createdBy: { type: String, required: true },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
