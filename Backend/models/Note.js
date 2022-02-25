const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,       

    },
    tag:{
        type:String,
        default:"General"

    },
    date:{
        type:String,
        default:Date.now
    }

});
const User =  mongoose.model('notes',NotesSchema);
// User.createIndexes()
module.exports = User;
