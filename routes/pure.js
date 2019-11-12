const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    let viewbag = {};

    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    // res.sendFile('pure.html', { root: path.join(__dirname, '../views')});
    //res.render('pure', viewbag);
    if (req.isAuthenticated()) {
        res.render('pure', { layout: false, isLogin: true });
    }
    else
        res.render('pure', { layout: false, isLogin: false });
});

module.exports = router;