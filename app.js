//requirements
const express = require('express');
const bodyParser = require('body-parser');
const PostRoutes = require('./routes/postRoutes');

const app=express();

//utiliser les middleware naissecaires

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+"/public"));

//Definition des routes

app.use('/',PostRoutes);

app.use(function(req, res) {
    res.status(400).send("<h1>Page Not Found !</h1>");
})


module.exports=app