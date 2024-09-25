// LibraryItem.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Library', librarySchema);
