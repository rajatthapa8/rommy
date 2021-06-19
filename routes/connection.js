const mongoose = require('mongoose');

const URI ='mongodb+srv://user001:abcd12345@cluster0.e4zms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectDB = async () => {
      try{
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
          console.log('db connected..!');
      }
     catch(err){
         console.log(err);
     }
    
  };
  
module.exports = connectDB;