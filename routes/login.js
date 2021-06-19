var express = require("express");
const connectDB = require("./connection");
var router = express.Router();
var user = require("../model/user");
const bcrypt = require('bcrypt');

router.post('/', async (req,res)=>{
   try{
      user.findOne({ username: req.body.uname }, (err, userObj)=>{
         if(err){
            console.log(err);
         } 
         
         if(userObj){
          //checking username in database
          //console.log("username matched your username is ",userObj.username);
          let bool = bcrypt.compareSync(req.body.pass,userObj.password);
          if(bool == false){
             console.log("password doesnot match please retype your password");
             res.send("password doesnot match please retype your password");
            }else{
             console.log("username and password match");
             //
             res.send("username and password match");
             //redirect to homepage
             //return res.redirect('http://localhost:3000/');
          }
         }

         if(!userObj){
          console.log("username doesnot exist");
          res.send("username doesnot exist please try again");
         }
         return;// res.redirect('http://localhost:3000/');
     });
   }catch(e){
      console.log(e);
   }

   
});

module.exports = router;