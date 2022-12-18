//requirements
const app = require("./app");
const mongoose = require('mongoose');
require('dotenv').config

//dfinition du moteur de template
app.set('view engine', 'pug')

// Etablire une connexion à la base de données

const DB_URI="mongodb+srv://nabilkannane:BVB094ever@cluster0.71dyn8p.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
      await mongoose.connect(DB_URI)
      console.log("CONNECTED MONGODB !")
    } catch (error) {
      console.log(error.message)
    }
}

  connectDb();

  
//Démarage du serveur su le le port : PORT dans .env
let port = process.env.PORT || 5000

app.listen( port ,()=>{console.log("Démarage du serveur su le le port : "+port)})