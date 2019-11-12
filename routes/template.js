const express = require('express');
const router = express.Router();
const path = require('path');
const isLogin = false;

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    // res.sendFile('index1.html', { root: path.join(__dirname, '../views')});
    if (req.isAuthenticated()) {
        isLogin = true;
    }
    else
        isLogin = false;

    res.render('weather', { layout: false, isLogin: isLogin });
});

module.exports = router;