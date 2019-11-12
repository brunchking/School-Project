const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    if (req.isAuthenticated()) {
        res.render('aboutus', { layout: false, isLogin: true });
    }
    else
        res.render('aboutus', { layout: false, isLogin: false });
});

module.exports = router;