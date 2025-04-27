const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require('express-session');


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
const path = require('path');
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));

// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));

// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

// middleware
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const authController = require('./controllers/auth.js');
const booksController = require('./controllers/books.js');
const shelvesController = require('./controllers/shelves.js');
const communityController = require('./controllers/community.js')

app.use(passUserToView); // use new passUserToView middleware here
app.use('/auth', authController);
app.use(isSignedIn); // use new isSignedIn middleware here
app.use('/books', booksController);
app.use('/shelves', shelvesController);
app.use('/community', communityController)


app.get('/', (req, res) => {
    // Check if the user is signed in
    if (req.session.user) {
        // Redirect signed-in users to their homepage
        res.render('home.ejs');
    } else {
        // Show the homepage for users who are not signed in
        res.render('index.ejs');
    }
});

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});
