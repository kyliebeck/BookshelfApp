const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')
const User = require('../models/user.js');



// AAU, I want to be able to view all of the books I have added to my collection on one page
router.get('/', async (req, res) => {
    const allBooks = await Book.find();

    res.render('books/index.ejs', { books: allBooks })
});

// AAU, I want to easily find and click on an ‘Add New Book link, which takes me to a form for adding new books to my bookshelf.
router.get('/new', async (req, res) => {
    res.render("books/new.ejs")
});

// AAU, I want to see the full details of each book I post
router.get('/:bookId', async (req, res) => {
    try {
        console.log("req params", req.params)
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
    try {
        const bookData = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            pageNumber: req.body.pageNumber,
            status: req.body.status,
            notes: req.body.notes,

        }
        const newBook = new Book(bookData);
        await newBook.save()
        // Redirect back to the books index page
        res.redirect("/books")
    } catch (error) {
        // if any errors, log them and redirect back home
        console.log(error);
        res.redirect('/')
    }
});

router.delete('/:bookId', async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books')
});





module.exports = router;