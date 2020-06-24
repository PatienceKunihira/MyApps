const express = require('express')
const router = express.Router();
const passport = require('passport');
const User = require('../models/userModel');
const path = require('path');
const permissions = require('../permissions')

router.get('/', (req, res) => {
    res.render('login')
})


router.post('/',
passport.authenticate('local',
{ failureRedirect:'/login'}),(req,res)=>{
    req.session.user = req.user;
    const role = permissions[req.user.role]
    res.redirect(role.homepage+'?userid=' +req.user.id);
 }
);
router.post("/", async (req, res) => {
    
    try {
        var user = new User(req.body)
        await User.register(user, req.body.firstName, (err)=>{
            if (err) {throw err}
            res.redirect('/login')
        })
    } catch(error){
        res.status(400).send("unable to save to database");
    }
});

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