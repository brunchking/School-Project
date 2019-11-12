const express =require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    res.sendFile('news.html', { root: path.join(__dirname, '../views')});
    //res.render('news', viewbag);
});

module.exports = router;