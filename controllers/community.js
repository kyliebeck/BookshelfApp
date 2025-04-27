const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')
const User = require('../models/user.js');
const Shelf = require('../models/shelf.js')

// AAU, I want to be able to go to the community page to view all users' shelves

router.get('/', async (req, res) => {

    const allShelves = await Shelf.find()
    const allBooks = await Book.find()

    res.render('community/index.ejs', {
        shelves: allShelves,

    })
})



module.exports = router;