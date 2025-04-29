const express = require('express');
const router = express.Router();

const Shelf = require('../models/shelf.js')

// AAU, I want to be able to go to the community page to view all users' shelves

router.get('/', async (req, res) => {

    const allShelves = await Shelf.find({
        user: { $not: { $eq: req.session.user._id } }
    })


    res.render('community/index.ejs', {
        shelves: allShelves,

    })
})



module.exports = router;