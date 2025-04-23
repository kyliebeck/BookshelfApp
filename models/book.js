const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    // properties of books
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    pageNumber: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Finished', 'Unread', 'In Progress'],
    },
    notes: {
        type: String,
    },

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;