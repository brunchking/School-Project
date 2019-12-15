const express = require('express');
var session = require('express-session')
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load database francis545@yahoo.com.tw
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');
const uuidv4 = require('uuid/v4');
const multer = require('multer'); // Multer upload image
const Pic_ID = require('../models/Pic_ID');
const testFolder = './tests/';
const fs = require('fs');
var db = require('./db');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let pic_IDs = { "notEmpty": "notEmpty" };
let isLogin = false;
let count = 0;

// 20191125 Comment board
// 刪除文章
router.get('/posts/delete/:id', function (req, res) {
    var id = req.params.id;
    db.deletePost(id, function (err) {
        if (err) {
            res.send(err);
        } else {

            // 成功後導回首頁
            res.redirect('/');
        }
    })
})

// 發表新文章的頁面
router.get('/posts', function (req, res) {
    res.render('newpost', { layout: false, isLogin: false });
})

// 新增文章
router.post('/posts', function (req, res) {
    var author = req.body.author;
    var content = req.body.content;

    // 這邊因為我很懶，所以文章 id 採用現在時間 + 一個亂數
    // 不能保證不會重複，這絕對是錯誤作法，請勿參考
    db.addPost({
        author: author,
        content: content,
        createTime: new Date(),
        id: new Date() * 1 + Math.floor(Math.random() * 99999)
    }, function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/community');
        }
    })
})

/* IT邦登入
// 輸出登入頁面
router.get('/login', function (req, res) {
    res.render('login');
})

// 登入，如果帳號密碼是 peter 123 就登入通過
router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username === 'peter' && password === '123') {
        console.log('login success');
        req.session.username = 'peter';
    }
    res.redirect('/');
})

// 登出，清除 session
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/')
})

*/


// Multer storage
const storage = multer.diskStorage({
    // destination: './public/user-upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    // storage: storage,
    limits: { fileSize: 10000000 }
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
});
// Multer check type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


fs.readdir('public/user-upload', (err, files) => {
    if (err) {
        return console.error(err);
    }
    files.forEach(file => {
        pic_IDs[count] = file;
        ++count;
    });
    
});

router.get('/', async function (req, res) {

    // 試著看看 session 裡面有沒有 username 可以拿
    // 判斷是否是管理員
    var username = req.session.username;
    var isAdmin = false;
    if (username) {
        isAdmin = true;
    }


    if (req.isAuthenticated()) {
        db.getPosts(function (err, posts) {
            if (err) {
                res.send(err);
            } else {
                // 記得要把 posts 反過來，才是正確的順序
                // 把所有東西丟給 ejs 去處理
                res.render('community', {
                    layout: false, isLogin: true, filename: undefined, pics: pic_IDs,
                    username: username,
                    isAdmin: isAdmin,
                    posts: posts.reverse()
                });
            }
        })
    }
    else {
        // 拿出所有的留言
        db.getPosts(function (err, posts) {
            if (err) {
                res.send(err);
            } else {
                // 記得要把 posts 反過來，才是正確的順序
                // 把所有東西丟給 ejs 去處理
                res.render('community', {
                    layout: false, isLogin: false, filename: undefined, pics: pic_IDs,
                    username: username,
                    isAdmin: isAdmin,
                    posts: posts.reverse()
                });
            }
        });
    }
});

router.post('/', upload.single('image'), async function (req, res) {
    if (req.isAuthenticated()) {
        isLogin = true;
    }
    else
        isLogin = false;
    if (!req.file) {
        res.render('community', {
            layout: false,
            isLogin: isLogin,
            msg: 'Error: No File Selected!'
        });
    }
    const imagePath = path.join(__dirname, '../public/user-upload');
    const fileUpload = new Resize(imagePath);
    const filename = await fileUpload.save(req.file.buffer);

    const newPic = new Pic_ID({
        pic_ID: filename
    });

    newPic.save();
    res.render('community', {
        layout: false,
        isLogin: isLogin,
        msg: '照片上傳成功!',
        filename: `user-upload/${filename}`,
        pics: pic_IDs
    });
});



module.exports = router;