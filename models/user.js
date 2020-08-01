const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    password:String,
    todo:String,
    done:String
});


module.exports = mongoose.model('User', userSchema);
