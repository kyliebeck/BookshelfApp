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
        enum: ['Finished', 'Unread', 'Currently Reading'],
    },
    notes: {
        type: String,
    },
    favorite: {
        type: Boolean
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;