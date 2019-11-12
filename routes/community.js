const express = require('express');
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


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

let pic_IDs = {"notEmpty": "notEmpty"};

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


let isLogin = false;
let count = 0;
fs.readdir('public/user-upload', (err, files) => {
    if (err) {
        return console.error(err);
    }
    files.forEach(file => {
        pic_IDs[count] = file;
        ++count;
    });
    console.log(pic_IDs);
});

router.get('/', async function (req, res) {
    if (req.isAuthenticated()) {
        await res.render('community', { layout: false, isLogin: true, filename: undefined, pics: pic_IDs});
    }
    else {
        await res.render('community', { layout: false, isLogin: false, filename: undefined , pics: pic_IDs});
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