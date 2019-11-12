const express = require('express');
const router = express.Router();
const path = require('path');

let isLogin = false;

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    // res.sendFile('choose.html', { root: path.join(__dirname, '../views')});
    //res.render('choose', viewbag);

    if (req.isAuthenticated()) {
        isLogin = true;
    }
    else
        isLogin = false;
    res.render('choose', { layout: false, isLogin: isLogin });
});

module.exports = router;