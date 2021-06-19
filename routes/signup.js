var express = require("express");
const connectDB = require("./connection");
var router = express.Router();
var user = require("../model/user");
const bcrypt = require('bcrypt');



router.post('/',async (req,res)=>{
    try{
    var uname = req.body.username;
    var password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    var noofpeople = req.body.noofPeople;
    var fullname=req.body.fullname;
    var member_avability = req.body.member_avability;
   
  
  user.findOne({ username: req.body.username }, (err, userObj)=>{
           if(err){
              console.log(err);
           } 
           
           if(userObj){
            //checks if username already exist
            //console.log(userObj.username);
            console.log("username already exist")
            res.send("Username already exist");
           }
           if(!userObj){
            var data=new user({ "username":uname,
                                "password":hashedPassword,
                                "no_of_people":noofpeople,
                                "full_name":fullname,
                                "user_avability":member_avability })
            data.save( function (error,document){
                 if (error){
                   console.error(error);
                   }else{
                    console.log(document) ;
                    console.log("data has been uploaded to mongo");
                  }
            });
            res.send("Thanks! your account has been sucessfully created. Please login to your account");
            console.log("user created");
            //return res.redirect('http://localhost:3000/');
           }
});
  }catch(e){
          console.log(e);
  }

  });






module.exports = router;

