const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    // res.sendFile('contact.html', { root: path.join(__dirname, '../views')});
    //res.render('contact', viewbag);
    if (req.isAuthenticated()) {
        res.render('contact', { layout: false, isLogin: true });
    }
    else
        res.render('contact', { layout: false, isLogin: false });
});

module.exports = router;