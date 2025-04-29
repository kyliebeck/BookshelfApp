const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/home', async (req, res) => {

    const allBooks = await Book.find({
        user: req.session.user._id
    });


    res.render('home.ejs', {
        books: allBooks
    });
});


module.exports = router;