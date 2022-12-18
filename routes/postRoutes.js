const express=require("express");
const { routes } = require("../app");
const {getPosts,getPost,addPost,updatePost,editPost,deletePost }=require("../controllers/postsController")

const router=express.Router();

// les routes post
router.get("/",(req,res)=>getPosts(req,res))

router.get("/addpost",(req,res)=>{res.render("addPost.pug");})

router.post("/addpost",(req,res)=>addPost(req,res))

router.get("/editpost/:id",(req,res)=>editPost(req,res))

router.post("/editpost/:id",(req,res)=>updatePost(req,res))

router.get('/details/:id',(req,res)=>getPost(req,res))

router.get('/delete/:id',(req,res)=>deletePost(req,res))

module.exports=router