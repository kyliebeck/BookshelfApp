const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')
const User = require('../models/user.js');
const Shelf = require('../models/shelf.js')

// AAU, I want to be able to view all of my shelves on one page
router.get('/', async (req, res) => {

    const allShelves = await Shelf.find({
        user: req.session.user._id
    });

    const allBooks = await Book.find();

    res.render('shelves/index.ejs', {
        shelves: allShelves,
        books: allBooks
    })
})
// AAU, I want to easily find and click on an ‘Add New shelf link, which takes me to a form for adding a new shelf to my collection.
router.get('/new', async (req, res) => {

    const allBooks = await Book.find({
        user: req.session.user._id,
    })
    const foundBook = await Book.findById(req.params.bookId, req.body)

    res.render("shelves/new.ejs", {
        books: allBooks,
        book: foundBook
    })
});

router.get('/:shelfId', async (req, res) => {
    const foundShelf = await Shelf.findById(req.params.shelfId).populate("books");
    const foundBook = await Book.findById(req.params.bookId)
    res.render('shelves/show.ejs', {
        shelf: foundShelf,
        book: foundBook

    })
});

router.post('/', async (req, res) => {
    const shelfData = {
        title: req.body.title,
        user: req.session.user._id,

    }
    const keysInReqBody = Object.keys(req.body)
    // filter through keysInReqBody to find all keys that include book-
    const shelfBooks = keysInReqBody.filter((key) => key.includes
        ('book-'))
    // split keys (books) at the hyphen to isolate the book id
    const bookIds = shelfBooks.map((book) => {
        // split the book string to remove first part
        const bookId = book.split('-')[1];
        return bookId;
    })
    shelfData.books = bookIds

    const newShelf = new Shelf(shelfData)
    newShelf.user = req.session.user._id;
    await newShelf.save();

    // redirect to shelf index page
    res.redirect('/shelves')
})


// AAU, I want to be able to edit any shelf that I post to my collection. 
router.get('/:shelfId/edit', async (req, res) => {
    const foundShelf = await Shelf.findById(req.params.shelfId);
    const allBooks = await Book.find();
    const foundBook = await Book.findById(req.params.bookId)
    res.render('shelves/edit.ejs', {
        shelf: foundShelf,
        books: allBooks,
        book: foundBook
    })
})
// AAU, I want my shelf details to be prefilled when I open the edit page
router.put('/shelfId', async (req, res) => {
    const updatedShelf = await Shelf.findByIdAndUpdate(req.params.shelfId, {
        title: req.body.title,
    }, { new: true });

    await updatedShelf.save();

    res.redirect(`/shelves/${req.params.shelfId}`)
});

router.delete('/:shelfId', async (req, res) => {
    await Shelf.findByIdAndDelete(req.params.shelfId);
    res.redirect('/shelves')
});


module.exports = router;