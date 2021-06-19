var express = require("express");
var app = express();
var moongoose = require("mongoose");
var router = express.Router();
var bodyParser = require('body-parser');
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
path = require('path')
//includes for connecting to database
var connectDB = require("../routes/connection");
connectDB();
//includes for user model
var user = require("../model/user");


/* --------------------------------
 *    ROUTES
 * -------------------------------- */

//routes for signup page
var signup = require("../routes/signup");
router.use('/signup',signup);

//routes for login page
var login = require("../routes/login");
router.use('/login',login);


//homepage routes
router.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname ,'../views','rommy','www', '/index.html'));
});

/* --------------------------------
 *    ROUTES END
 * -------------------------------- */
app.use("/",router);
app.use(express.static('views/rommy/www'));
app.listen(3000);