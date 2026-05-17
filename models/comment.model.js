const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = mongoose.Schema({
    CommenterEmail: {
        type: String,
        required: [true, "Who is the on commenting"],
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid")
            }
        }
    },
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Which post are you commenting on"],
        ref: 'Post'
    },
    CommentContent: {
        type: String,
        required: [true, "What is it you want to say"],
        trim: true
    },
    date: {
        type: String,
        default: new Date().toDateString()
    }
}
)

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;