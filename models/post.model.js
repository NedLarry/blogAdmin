const mongoose =require('mongoose');
const PostsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "What is the title of the post"]
    },
    description:{
        type: String,
        required: [true, "give a brief description of post"]
    },
    content:{
        type: String,
        required: [true, "The content to post is missing"]
    },
    category: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    },
    readTime: {
        type: String,
        default: '1 min'
    },
    featured: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        default: new Date().toDateString()
    }
})


PostsSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'PostId'
})

const Post = mongoose.model('Post', PostsSchema);

module.exports = Post;