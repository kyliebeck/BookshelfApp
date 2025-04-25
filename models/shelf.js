const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    // properties of shelves
    title: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Book'
    }]
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;