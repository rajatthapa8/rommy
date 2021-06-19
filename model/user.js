const moongoose = require("mongoose");

var userSchema = new moongoose.Schema({
   username:{
       type:String
   },
   password:{
       type:String
   },
   no_of_people:{
    type:String
   },
   full_name:{
       type:String
   },
   user_avability:{
       type:String
   }
});

module.exports = moongoose.model('user',userSchema);