const express = require('express');
const router = express.Router();
const Book = require('../models/book.js')

router.get('/', async (req, res) => {
    // if im logged in, i want to see home
    if (req.session.user) {

        const allBooks = await Book.find({
            user: req.session.user._id
        });

        // Count the number of books whose status is Finished 
        const readBooks = [];
        for (i = 0; i < allBooks.length; i++) {
            // push the finished books into an array called readBooks
            readBooks.push(allBooks[i].status === "Finished")
        }
        let count = 0;
        for (let i = 0; i < readBooks.length; i++) {
            if (readBooks[i] === true) {
                count++;
            }
        }



        res.render('home.ejs', {
            books: allBooks,
            count
        });

    } else {
        //else i want to see index
        res.render('index.ejs')
    }








});


module.exports = router;