var express = require('express');
var app =express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var course=require("./routes/courses");
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
//passport auth
var passport = require('passport');
var jwt = require('jsonwebtoken');


var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://canvasUser:189293Kp@canvascluster-wpxt5.mongodb.net/canvas?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });

var {userModel}=require("./models/models");

require('./config/passport')(passport);
app.use(fileUpload());


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_canvas',
    resave              : true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

//Allow Access Control
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.header('Cache-Control', 'no-cache');
    next();
  });
  app.use(bodyParser.json());

// app.use("/courses",course);

//login implemented using async await 

 app.post('/login',function(req,res){
    (async function(){

      let loginSuccess=0;
      // var sql=`SELECT * FROM Users WHERE email=${mysql.escape(req.body.email)}`;
     // console.log(sql);
      try {
        let{email,password}=req.body; 
        //const result=await query(sql);
        let result=await userModel.findOne({email});
        let data=null;
        if(!result){
          data={
            loginSuccess:0,
            message:"Email or Password Incorrect"
          };
        }else{
          const match = await bcrypt.compare(password, result.password);
          if(match){
            var user = {
              email: result.email
          };
          var token = jwt.sign(user, "There is no substitute for hardwork", {
            expiresIn: 10080 // in seconds
        });
            data={
              loginSuccess:1,
              message:"Login Successfull!",
              token: 'JWT ' + token
            };
            console.log(result);
            console.log(result._id);
            res.cookie('cookie',JSON.stringify({email:result._id,role:result.role,token: 'JWT ' + token}),{maxAge: 900000000, httpOnly: false, path : '/'});
            req.session.user = result._id;
          }else{
            data={
              loginSuccess:0,
              message:"Email or Password Incorrect"
            };
          }
        }
       res.status(200).json(data);
      } catch (error) {
        res.writeHead(400,{
          'Content-Type':'text/plain'
       });
       console.log(error);
       res.end(error.toString());
      }
    })();
   

   

    
});

app.post('/signup',function(req,res){
  let{email,password,name,role}=req.body; 
  (async()=>{
    try {
          let responseOne=await userModel.findOne({email});
        if(responseOne){
            var body={
                      message:"Signup failed! Email already exists",
                      insertStatus:0
                    };
            res.status(200).json(body);
        }else{
            let hash=await bcrypt.hash(password, saltRounds);

            //saving user to mongoDB
            
            var user=new userModel({email,password:hash,name,role});
            let response=await user.save();
            console.log("user saved");
            console.log(response);
            var body={
              message:"Sign up successfull. Redirecting to Login Page...",
              insertStatus:1
            };
            res.status(200).json(body);
        } 
    } catch (error) {
      res.writeHead(400,{
        'Content-Type':'text/plain'
     });
     res.end(err.toString());
      console.log(error);
    }
  })();
});
module.exports = app;
app.listen(3001,function(){
console.log("Server Listening on port 3001");
});