const pug = require('pug');
const fs = require('fs');
const Post=require("../models/post/postModel");


async function getPosts(req,res){
   //Recupérer tous les posts dans myBlogdb et envoyer index.pug au client
    let posts = await Post.find();
    console.log(posts);
    str ="";
    await posts.forEach((e)=>{
        str=str+`
.card 
        .headerCard ${e.titre}
            .cmd 
                a(href="/editpost/${e._id}")
                    button Modifier 
                a(href="/delete/${e._id}")
                    button Supprimer
        p Auteur : ${e.auteur}
        p Date de Creation : ${e.createdAt}
        p Date de Modification: ${e.updatedAt}
        br
        p Résume 
        br
        p ${e.resume}...
            a(href="/details/${e._id}") Lire plus
`;
        
    })
    await fs.writeFileSync("./views/includes/posts.pug",str,(err)=>console.error(err));
    await res.render("index.pug")
}

async function getPost(req,res){
    //Recupérer un post definie par son _id dans myBlogdb et envoyer post.pug au client
    id = req.params.id
    let post = await Post.findById(id);
    res.render("post.pug",post);
}

async function addPost(req,res){
   //Créer un nouveau post dans myBlogdb et rediriger le client vers /
   const post = new Post({
    titre : req.body.Title,
    auteur : req.body.Auteur,
    resume : req.body.Resume,
    content : req.body.Content,
   })
   post.save()
   .then((result)=>{
    res.redirect("/");

})
   .catch((err)=>console.log(err))

}

async function editPost(req,res){
    //Recupérer un post definie par son _id et renvoyer au client editPost.pug avec les donnée de ce post
    id =req.params.id
    let data = await Post.findById(id);
    console.log(data);

    res.render("editPost.pug",data);
}
async function updatePost(req,res){
    //metre à jour un post et rediriger le client vers ce post
    id = req.params.id;
    const data = req.data;

    Post.findByIdAndUpdate(id,{
        titre: req.body.Title,
        auteur: req.body.Auteur,
        resume: req.body.Resume,
        content: req.body.Content,
    },{new : true})
    .then(result => res.redirect('/'))
    .catch((err) => console.log(err));
}

async function deletePost(req,res){
    //Suprimer un post et rediriger le client vers /
    id = req.params.id;

    Post.findByIdAndDelete(id)
    .then(result =>{
        res.redirect('/');
    })
    .catch(err => console.log(err));
}




module.exports={getPosts,getPost,addPost,updatePost,editPost,deletePost}