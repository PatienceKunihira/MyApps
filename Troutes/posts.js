const express = require('express');
const router = express.Router();
const Posts = require('../Tmodels/Posts');

router.get('/',(req,res)=>{
    res.send('We are on posts');
}); 
router.get('/specific',(req,res)=>{
    res.send('Specific posts');
}); 


router.post('/',(req,res)=>{
    console.log(req.body);
});

module.exports = router;