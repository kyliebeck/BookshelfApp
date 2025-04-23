const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/home', (req, res) => {
    res.render('home.ejs');
});