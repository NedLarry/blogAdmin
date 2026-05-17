const path = require('path')
const mongoose = require('mongoose');
const express = require('express');
const hbs = require('hbs'); 
const helmet = require('helmet')
require('dotenv').config();
require('./db/mongooseConnect.js')

const Post = require('./models/post.model.js');
const Comment = require('./models/comment.model.js');

const app = express();
app.use(express.json());
app.set('view engine', hbs);
app.use(express.static(path.join(__dirname, './public')))
app.use(helmet())


app.get('/allpost', async (req, res) => {

    try {
        const posts = await Post.find({}).populate('comments').exec();

        const postsWithCounts = posts.map(post => {
            const postObj = post.toObject({ virtuals: true });
            postObj.commentsCount = Array.isArray(postObj.comments) ? postObj.comments.length : 0;
            postObj.likesCount = 0;
            return postObj;
        });

        return res.status(200).json(postsWithCounts);

    } catch (e) {
        console.error('Error loading posts:', e);
        res.status(500).json({ error: 'Error loading posts' });
    }

})

app.get('/:id', async (req, res) => {

    try{

        const retrievedPost = await Post.findById(req.params.id);

        console.log('item', retrievedPost);

        if(!retrievedPost){
            return res.status(404).send();
        }

        res.send(retrievedPost);
        
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})


app.post('/post', async (req, res) => {
    try{

        const newPost = Post(req.body);
        await newPost.save();
        res.status(201).send(newPost);

    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

app.post('/comment', async (req, res) => {
    try{

        console.log('comment body', req.body);
        const newComment = Comment(req.body);
        await newComment.save();
        res.status(201).send(newComment);

    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

app.listen(process.env.PORT || 3000, () => {console.log("we're live.");});