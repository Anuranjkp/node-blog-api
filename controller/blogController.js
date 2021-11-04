const Post = require("../models/postModels");
const ObjectId = require("mongodb").ObjectId

exports.showPosts = (req,res,next)=>{
    const posts = Post.find().then((posts)=>{
        res.status(200).json({
            posts: posts
        })
    }).catch(err=>{
        console.log(err)
    })
}

exports.createPosts = (req,res,next ) =>{
    const title = req.body.title;
    const content = req.body.content;
    const authorName = req.body.authorName
    if(!req.body) {
        console.log("body is not found from request")
    }

    const post = new Post({
        title:title,
        content:content,
        authorName:authorName
    })

    post.save().then((result)=>{
        res.status(201).json({
            message:"post saved successfully"
        }); 
    })
}

exports.editPost = (req,res,next)=>{
    const postId = req.params.postId;

    const title = req.body.title;
    const content = req.body.content
    const authorName = req.body.authorName

    const post = Post.findById(postId).then((post)=>{
        if(!post){
            res.status(501).json({
                message:"post is not available"
            })
        }       //checking id exist

        post.title = title; //updating title to database 
        post.authorName = authorName; //updating authorname to database
        post.content = content  //updating content to database
        return post.save();   //saving changes to databse
    }).then((post)=>{
        res.status(200).json({
            message:"post edited sucessfully",
            post: post
        })
    }).catch((err)=>{
        console.log(err)
    })
}

exports.deletePost = (req,res,next) =>{
    const postId = req.params.postId;
    const post = Post.findById(postId).then(async(post)=>{
        if(!post){
            res.status(501).json({
                message:"post not found"
            })
        }
        console.log(postId)
        return await Post.deleteOne(ObjectId(postId));

    }).then((post)=>{
        res.status(200).json({
            message:"post deleted successfully",
            post: post
        })
    }).catch((err)=>{
        console.log(err)
    })
}