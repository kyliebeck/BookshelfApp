// middleware/is-signed-in.js

const isSignedIn = (req, res, next) => {
    // if the user has a valid session, proceed
    if (req.session.user) {
        return next();
    }
    // otherwise, send them to the sign in
    res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;
