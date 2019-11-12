const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    // res.sendFile('index1.html', { root: path.join(__dirname, '../views')});

    if (req.isAuthenticated()) {
        res.render('index1', { layout: false, isLogin: true });
    }
    else
        res.render('index1', { layout: false, isLogin: false });
});

module.exports = router;