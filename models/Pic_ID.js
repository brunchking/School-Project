const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    pic_ID: {
        type: String,
        required: true
    }
});

const Pic_ID = mongoose.model('Pic_ID', UserSchema);

module.exports = Pic_ID ;