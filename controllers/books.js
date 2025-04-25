const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')
const User = require('../models/user.js');
const Shelf = require('../models/shelf.js')



// AAU, I want to be able to view all of the books I have added to my collection on one page
router.get('/', async (req, res) => {

    const allBooks = await Book.find({
        user: req.session.user._id
    });
    const foundBook = await Book.findById(req.params.bookId, req.body)

    res.render('books/index.ejs', {
        books: allBooks,
        book: foundBook
    })
});

// AAU, I want to easily find and click on an ‘Add New Book link, which takes me to a form for adding new books to my collection.
router.get('/new', async (req, res) => {
    res.render("books/new.ejs")
});

// AAU, I want to see the full details of each book I post
router.get('/:bookId', async (req, res) => {
    try {

        const foundBook = await Book.findById(req.params.bookId)

        res.render('books/show.ejs', {
            book: foundBook,
        });
    } catch (error) {
        console.log(error);
        res.redirect('books/index')
    }
});



// AAU I want to be able to POST my new book into my current collection and view it on my index page
router.post('/', async (req, res) => {

    const bookData = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pageNumber: req.body.pageNumber,
        status: req.body.status,
        notes: req.body.notes,
        user: req.session.user._id,
    }
    const newBook = new Book(bookData);
    await newBook.save()
    // Redirect back to the books index page
    res.redirect("/books")
});

// AAU, I want to be able to edit any book that I post to my collection. 

router.get('/:bookId/edit', async (req, res) => {
    const foundBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {
        book: foundBook
    });
});
// AAU, I want my book details to be prefilled when I open the edit page
router.put('/:bookId', async (req, res) => {

    const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        pageNumber: req.body.pageNumber,
        notes: req.body.notes,
    }, { new: true });

    await updatedBook.save();

    // redirect back to the show view of current book
    res.redirect(`/books/${req.params.bookId}`);


})



router.delete('/:bookId', async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books')
});





module.exports = router;