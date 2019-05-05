var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  role: String,
});

var clusterSchema = new Schema({
  ipaddress: String,
  status:{
    type:String,
    default:"ON"
  },
  sensorNodeArray: [{
    type: Schema.Types.ObjectId, ref: 'sensornode'
  }]
});

var regionSchema = new Schema({
  name: String,
  address: String,
  lattitude: String,
  longitude: String,
  clusterArray: [{
    type: Schema.Types.ObjectId, ref: 'cluster'
  }]
});

var sensorNodeSchema = new Schema({
  ipaddress: String,
  status:{type:String,default:"ON"},
  data: {
    temperatureData: [{
      date: Date,
      details: [{
        temperature: Number
      }]
    }],
    rainData:[{
      date:Date,
      details:[{
        rain:Number
      }]
    }],
    windData:[{
      date:Date,
      details:[{
      wind:Number
      }]
    }],
    humidityData:[{
      date:Date,
      details:[{
        humidity:Number
      }]
    }],
    smokeData:[{
      date:Date,
      details:[{
        smoke:Number
      }]
    }]
  }
});
var temperatureSensorSchema = new Schema({
  data:[{
    date:Date,
    details:[{
      temperature:Number
    }]
  }]
});
var smokeSensorSchema = new Schema({
  data:[{
    date:Date,
    details:[{
      smoke:Number
    }]
  }]
});
var humiditySensorSchema = new Schema({
  data:[{
    date:Date,
    details:[{
      humidity:Number
    }]
  }]
});
var rainSensorSchema = new Schema({
  data:[{
    date:Date,
    details:[{
      rain:Number
    }]
  }]
});
var windSensorSchema = new Schema({
  data:[{
    date:Date,
    details:[{
      wind:Number
    }]
  }]
});

var userModel = mongoose.model('users', userSchema);
var clusterModel = mongoose.model('cluster', clusterSchema);
var regionModel = mongoose.model('region', regionSchema);
var sensorNodeModel = mongoose.model('sensornode', sensorNodeSchema);
var temperatureModel = mongoose.model('temperature', temperatureSensorSchema );
var windModel = mongoose.model('wind', windSensorSchema );
var smokeModel = mongoose.model('smoke', smokeSensorSchema );
var rainModel = mongoose.model('rain', rainSensorSchema );
var humidityModel = mongoose.model('humidity', humiditySensorSchema );

module.exports = {
  userModel,
  clusterModel,
  regionModel,
  sensorNodeModel,
  temperatureModel,
  windModel,
  smokeModel,
  rainModel,
  humidityModel
}