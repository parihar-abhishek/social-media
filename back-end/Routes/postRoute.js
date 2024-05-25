const express = require('express')
const Post = require('../Models/postModel')
const fetchUser =require('../Middleware/fetchUser')

const router = express.Router()

router.get('/getAllPost',fetchUser,async (req,res)=>{
    try {
        const allPost = await Post.find({})
        res.status(200).json(allPost)
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error); 
    }
})

router.get('/getOnePost/:id',fetchUser,async (req,res)=>{
    try {
        const allPost = await Post.find({user: req.params.id})
        res.status(200).json(allPost)
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.log(error); 
    }
})

router.post('/addPost', fetchUser, async(req, res) => {
    try {
       
        const { image, description} = req.body
        if (!image || !description ) {
            return res.status(400).json({ "error": "All fields are required" });
        }
        const newPost = new Post({ image, description,  user: req.userId });
        const savedPost = await newPost.save();
        res.json(savedPost);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/updateNote/:id', fetchUser, async (req, res) => {
    const {image, description} = req.body;
    const {id} = req.params;

    try {
        const post = await Post.findById({_id : id})
        if (!post) {
              res.status(404).send("Not Found")
        }
        if (post.user.toString() !== req.userId) {
            return res.status(401).send("You are not authorized");
        }
        console.log(post);
        const notes = await Post.findByIdAndUpdate({_id : id}, {
            $set : {
                image,
                description,
            }
        }, {new : true})

        res.json({notes, success : "Notes Updated Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletePost/:id', fetchUser, async (req, res) => {
    try {
        let requirePost = await Post.findById(req.params.id);
        if (!requirePost) { 
            res.status(404).send("Not Found") }

        if (requirePost.user.toString() !== req.userId) {
             res.status(401).send("Not Allowed");
        }

        const post = await Post.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router