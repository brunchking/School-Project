const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');
let isLogin = false;


// Login or signup
// router.get('/', (req, res, next) => {
//     let viewbag = {};
//     if (req.session && req.session.user) {
//         viewbag.user = req.session.user;
//     }
//     //res.sendFile('users.html', { root: path.join(__dirname, '../views')});
//     res.render('welcome');
// });

// Login page
router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        const user = { first_name, last_name, email, password, password2, checkbox } = req.user;
        res.render('layout', { isLogin: true, user: user});
    }
    else
        res.render('layout', { isLogin: false });
});

router.get('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('login_v2', {
            name: req.user.name,
            isLogin: true
        })
    }
    res.render('register_v2', { layout: false, isLogin: false});
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    });
});

// Register page
// router.get('/register', (req, res) => res.render('register'));

// Register system
router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, password2, country, checkbox } = req.body;
    let errors = [];

    //Check form
    if (!first_name || !last_name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Check passwords 
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (checkbox === undefined) {
        errors.push({ msg: 'Please agree our service and privacy policy' });
    }
    if (errors.length > 0) {
        res.render('register_v2', {layout: false, isLogin: false,
            errors,
            first_name,
            last_name,
            email,
            password,
            password2
        });
    }
    else {
        // If pass then find
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' });
                    res.render('register_v2', {
                        layout: false,
                        isLogin: false,
                        errors,
                        first_name,
                        last_name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User({
                        first_name,
                        last_name,
                        email,
                        password,
                        country
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('/users');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/users',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    isLogin = false;
    req.logout();
    req.flash('success_msg', 'Logged out successfully');
    res.redirect('/users');
});

module.exports = router;

