var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var course = require("./routes/courses");
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const util = require('util');
const saltRounds = 10;
//passport auth
var passport = require('passport');
var jwt = require('jsonwebtoken');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://canvasUser:189293Kp@canvascluster-wpxt5.mongodb.net/smartAlert?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true }).catch((err) => {
  console.log("error");
});

var { userModel,
  clusterModel,
  regionModel,
  sensorNodeModel,
  temperatureModel,
  windModel,
  smokeModel,
  rainModel,
  humidityModel } = require("./models/models");

require('./config/passport')(passport);
app.use(fileUpload());


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
  secret: 'cmpe273_canvas',
  resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//Allow Access Control
app.use(function (req, res, next) {
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


app.post('/login', function (req, res) {
  (async function () {

    let loginSuccess = 0;
    // var sql=`SELECT * FROM Users WHERE email=${mysql.escape(req.body.email)}`;
    // console.log(sql);
    try {
      let { email, password } = req.body;
      //const result=await query(sql);
      let result = await userModel.findOne({ email });
      let data = null;
      if (!result) {
        data = {
          loginSuccess: 0,
          message: "Email or Password Incorrect"
        };
      } else {
        const match = await bcrypt.compare(password, result.password);
        if (match) {
          var user = {
            email: result.email
          };
          var token = jwt.sign(user, "There is no substitute for hardwork", {
            expiresIn: 10080 // in seconds
          });
          data = {
            loginSuccess: 1,
            message: "Login Successfull!",
            token: 'JWT ' + token
          };
          console.log(result);
          console.log(result._id);
          res.cookie('cookie', JSON.stringify({ email: result._id, role: result.role, token: 'JWT ' + token }), { maxAge: 900000000, httpOnly: false, path: '/' });
          req.session.user = result._id;
        } else {
          data = {
            loginSuccess: 0,
            message: "Email or Password Incorrect"
          };
        }
      }
      res.status(200).json(data);
    } catch (error) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      console.log(error);
      res.end(error.toString());
    }
  })();





});

app.post('/signup', function (req, res) {
  let { email, password, name, role } = req.body;
  (async () => {
    try {
      let responseOne = await userModel.findOne({ email });
      if (responseOne) {
        var body = {
          message: "Signup failed! Email already exists",
          insertStatus: 0
        };
        res.status(200).json(body);
      } else {
        let hash = await bcrypt.hash(password, saltRounds);

        //saving user to mongoDB

        var user = new userModel({ email, password: hash, name, role });
        let response = await user.save();
        console.log("user saved");
        console.log(response);
        var body = {
          message: "Sign up successfull. Redirecting to Login Page...",
          insertStatus: 1
        };
        res.status(200).json(body);
      }
    } catch (error) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.end(err.toString());
      console.log(error);
    }
  })();
});

function randomizer(num) {
  return Math.floor(Math.random() * num);
}

app.post('/addregion', async (req, res) => {
  try {
    let { name, address, lattitude, longitude } = req.body;
    let regionInstance = new regionModel({
      name,
      address,
      lattitude,
      longitude
    });
    let result = await regionInstance.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" })
  }
});
app.post('/addcluster', async (req, res) => {
  try {
    let { ipaddress, regionId } = req.body;
    let clusterInstance = new clusterModel({
      ipaddress
    });
    let result = await clusterInstance.save();
    let result2 = await regionModel.updateOne({ _id: regionId }, {
      $push: {
        clusterArray: result._id
      }
    })
    res.status(200).json(result2);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" })
  }
});
app.post('/addsensornode', async (req, res) => {
  try {
    let { ipaddress, clusterId } = req.body;
    let temperatureData = await temperatureModel.find({});
    let rainData = await rainModel.find({});
    let smokeData = await smokeModel.find({});
    let windData = await windModel.find({});
    let humidityData = await humidityModel.find({});

    temperatureData = temperatureData[randomizer(temperatureData.length)].data;
    rainData = rainData[randomizer(rainData.length)].data;
    smokeData = smokeData[randomizer(smokeData.length)].data;
    windData = windData[randomizer(windData.length)].data;
    humidityData = humidityData[randomizer(humidityData.length)].data;

    let sensornodeInstance = new sensorNodeModel({
      ipaddress,
      data: {
        temperatureData,
        rainData,
        smokeData,
        windData,
        humidityData
      }

    });

    let result = await sensornodeInstance.save();
    let result2 = await clusterModel.updateOne({ _id: clusterId }, {
      $push: {
        sensorNodeArray: result._id
      }
    })
    res.status(200).json(result2);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);

  }

});
app.post('/deletesensorNode', async (req, res) => {
  let { sensornodeId } = req.body;
  try {
    let result = await sensorNodeModel.deleteOne({ _id: sensornodeId });
    let result2 = await clusterModel.updateOne({ "sensorNodeArray": { "$in": sensornodeId } }, {
      $pull: {
        sensorNodeArray: sensornodeId
      }
    })
    res.status(200).json(result2);
  } catch (error) {

  }
});
app.post('/deleteCluster', async (req, res) => {
  let { clusterId } = req.body;
  try {
    let { sensorNodeArray } = await clusterModel.findOne({ _id: clusterId });
    let ress = await sensorNodeModel.deleteMany({ _id: { $in: sensorNodeArray } });
    let result = await clusterModel.deleteOne({ _id: clusterId });
    let result2 = await regionModel.updateOne({ "clusterArray": { "$in": clusterId } }, {
      $pull: {
        clusterArray: clusterId
      }
    })
    res.status(200).json(result2);
  } catch (error) {

  }
});
app.post('/updatesensornode', async (req, res) => {
  let { ipaddress, status, sensorId } = req.body;
  try {
    let result = await sensorNodeModel.updateOne({ _id: sensorId }, {
      status,
      ipaddress
    })
    res.status(200).json(result);
  } catch (error) {

  }
});
app.post('/updatecluster', async (req, res) => {
  let { ipaddress, status, clusterId } = req.body;
  try {
    let result = await clusterModel.updateOne({ _id: clusterId }, {
      status,
      ipaddress
    })
    res.status(200).json(result);
  } catch (error) {

  }
});
app.get('/users', async (req, res) => {
  try {
    let result = await userModel.find({});
    res.status(200).json(result);
  } catch (error) {

  }
})
app.get('/data/:regionId', async (req, res) => {
  try {
    let {regionId}=req.params;
    let result = await regionModel.find({_id:regionId}).populate({path:"clusterArray",type:"cluster",populate:{path:"sensorNodeArray",type:"sensornode"}}).exec();
    res.status(200).json(result);
  } catch (error) {

  }
})
app.post('/deleteUser',async (req,res)=>{
  try {
    let {userId}=req.body;
    let result=await userModel.deleteOne({_id:userId});
    res.status(200).json(result);
  } catch (error) {
    
  }
});

app.get('/allregions',async (req,res)=>{
  try {
    let result=await regionModel.find({});
    res.status(200).json(result);
  } catch (error) {
    
  }
})
app.get('/allclusters',async (req,res)=>{
  try {
    let result=await clusterModel.find({});
    res.status(200).json(result);
  } catch (error) {
    
  }
})
app.get('/allsensors',async (req,res)=>{
  try {
    let result=await sensorNodeModel.find({});
    res.status(200).json(result);
  } catch (error) {
    
  }
})
// app.post('/addSensor',function(req,res){
//   let{clusterid,latitude,longitude}=req.body; 
//   (async()=>{
//     try {
//           let responseOne=await userModel.findOne({email});
//         if(responseOne){
//             var body={
//                       message:"Signup failed! Email already exists",
//                       insertStatus:0
//                     };
//             res.status(200).json(body);
//         }else{
//             let hash=await bcrypt.hash(password, saltRounds);

//             //saving user to mongoDB

//             var user=new userModel({email,password:hash,name,role});
//             let response=await user.save();
//             console.log("user saved");
//             console.log(response);
//             var body={
//               message:"Sign up successfull. Redirecting to Login Page...",
//               insertStatus:1
//             };
//             res.status(200).json(body);
//         } 
//     } catch (error) {
//       res.writeHead(400,{
//         'Content-Type':'text/plain'
//      });
//      res.end(err.toString());
//       console.log(error);
//     }
//   })();
// });

module.exports = app;
app.listen(3001, function () {
  console.log("Server Listening on port 3001");
});