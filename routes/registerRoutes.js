const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const path = require('path');
const permissions = require('../permissions');

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../views", "/index.html"));
  });


router.post("/", async(req, res) => {
    try{
        var user = new User (req.body);
        await User.register(user,req.body.password,(err)=>{
            if(err) {throw err}
            res.redirect('/login')
        })   
    
    }catch(error){
        res.status(400).send("unable to save to database");
    }
    });

    router.post("/update", async (req, res) => {
        if (req.session.user) {
            try {
            const updateduser = await User.findOneAndUpdate({ _id: req.session.user._id },req.body)
            const role = permissions[updateduser.role]
            res.redirect(role.homepage);
            } catch (error) {
            res.status(400).send("unable to update to database");
            }
        }
        else{
          res.redirect('/login') 
        }
      })
    router.post("/delete", async (req, res) => {
        //requesting for the session information of the user
        if (req.session.user) {
            try {
                //request for the body.. and in thebody pick the id and put it in that variable -id.
            await User.deleteOne({ _id: req.body.id })
            res.redirect('back')
            } catch (error) {
            res.status(400).send("unable to delete to database");
            }
        }
        else{
          res.redirect('/login') 
        }
      })
      router.get('/userlist', async (req, res) => {
        try {
            let items = await User.find()
            if(req.query.firstName){
                items = await User.find({firstName:req.query.firstName})
            }
            res.render('list', {users: items})
        } catch(error){
            res.status(400).send("unable to find items in the database");
        }
    })



   
      
module.exports = router;       