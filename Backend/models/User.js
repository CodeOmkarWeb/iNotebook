const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,

    },
    date:{
        type:String,
        default:Date.now
    }

});
const User =  mongoose.model('user',UserSchema);
// User.createIndexes()
module.exports = User;
