const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const passport = require('passport')

router.get('/adminhome', (req, res) => {
  if (req.session.user) {
  res.render('adminhome', {name: req.session.user.firstName });
  
  }else{
    res.redirect('/login')
  }
})

router.get('/customerhome',async (req, res) => {
  
  if(req.session.user){
      try {
          let useritem = await User.findById(req.query.userid)
          console.log(useritem)
          res.render('customerhome', {user: useritem});
        }
        catch(err){
          res.status(500).send("unable to find items in the database");
        }
  }
  else{
      res.redirect('/login')
  }
})

router.get('/userlist', async (req, res) => {
  if(req.session.user){
      try {
          let items = await User.find()
  
          if(req.query.firstName){
              items = await User.find({firstName: req.query.firstName})
          }
  
          res.render('list', {users: items})
  
      } catch(error){
          res.status(400).send("unable to find items in the database");
      }
  }
  else{
      res.redirect('/login')
  }
})

// router.get('/adminhome', (req,res)=>{
//     res.render('adminhome',{name: req.query.user})
// });


// router.get('/userlist',async(req,res)=>{
//     try{
//        let items = await User.find()
//        if (req.query.othername){
//            items = await User.find({othername:req.query.othername})
//        }

//          res.render('list', {users:items})
//        }catch (err){
//         res.status(400).send("unable to find items in the database");
//        }
//      }) 

module.exports = router;     
