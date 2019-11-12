const express =require('express');
const router = express.Router();

let isLogin = false;

router.get('/', (req, res, next) => {
    let viewbag = {};
    if (req.session && req.session.user) {
        viewbag.user = req.session.user;
    }
    if (req.isAuthenticated()) {
        isLogin = true;
    }
    else 
        isLogin = false;
    res.render('./attractions/o', {layout: 'layout_attractions', isLogin: isLogin, char: 'o'});
});

module.exports = router;