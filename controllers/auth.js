const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/is-auth');

exports.getLogin = (req, res, next) => {


        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: message
        });



};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid email or password.');
                console.log('nope');
                return res.redirect('/login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            console.log('nope 2');
                            res.redirect('view-bug');
                        });
                    }
                    req.flash('error', 'Invalid email or password.');
                    console.log('nope 3');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    console.log('nope 4');
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
    console.log('nope');
};

exports.postSignup = (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'E-Mail exists already, please pick a different one.');
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        fullName: fullName,
                        email: email,
                        password: hashedPassword,
                        bugs: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
