//we are importing express
const express = require('express')
//we are going to excecute express
const app = express();
const mongoose = require('mongoose');
//middleware:- its a function that executes when a specific routes are being hit.
// app.use('/posts',()=>{
//     console.log('This is a middleware running')
// });

//import routes
const postsRoute = require('./Troutes/posts');
const userRoute = require('./Troutes/posts')

app.use('/posts',postsRoute);
app.use('/user',userRoute);


//creating routes
app.get('/',(req,res)=>{
    res.send('We are on homee');
}); 

//connecting to the database
mongoose.connect('mongodb://localhost:27017/tests',
{ useNewUrlParser:true, useUnifiedTopology: true },  
function (err) {
    if (err) throw err;
    console.log('Successfully connected to DB');
 });










//how to start listening
app.listen(3030);