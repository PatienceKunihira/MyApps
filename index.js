const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/userModel');
const session = require('express-session');
const passport = require('passport');
const server = express();




server.set('view engine','pug')
server.set('views', __dirname + '/views')
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

server.use(session({
  secret: 'thesecret',
  resave: true,
  saveUninitialized: false
}))

server.use('/register', registerRoutes)
server.use('/login', loginRoutes)
server.use('/user', userRoutes)


mongoose.connect('mongodb://localhost:27017/node-demo',
 { useNewUrlParser:true, useUnifiedTopology: true },
 function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

server.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy(function (err) {
          if (err) {
          } else {
              return res.redirect('/login');
          }
      })
  } 
})





server.listen(3500,() => {
  console.log('listening on 3500')
})

 
