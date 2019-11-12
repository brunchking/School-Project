const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    viewbag.a = 5;
    res.render('test', {layout: false , viewbag});
    const hey = document.querySelector('.box');
    console.log(hey);
});

module.exports = router;