const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");

var registerSchema = new mongoose.Schema({
     firstName: String,
     othername: String,
     customer: String,
     role: {type:String, required:'Please enter a role'}
  }); 
registerSchema.plugin(passportLocalMongoose,{usernameField:'password'})
module.exports= mongoose.model("User", registerSchema);


