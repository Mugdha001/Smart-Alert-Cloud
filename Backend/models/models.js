var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  name:String,
  role:String,
});

var clusterSchema = new Schema({
  clusterid: String,
  clusterlatitude: String,
  clusterlongitude:String
});

var sensorSchema = new Schema({
  sensorid: String,
  sensorlatitude: String,
  sensorlongitude:String
});

var courseSchema=new Schema({
  courseId: Number,
  courseTerm: String,
  courseDepartment: String,
  courseName: String,
  courseDescription: String,
  courseRoom: String,
  courseCapacity: Number,
  waitlistCapacity: Number,
  currEnrollment: Number,
  currWaitlist: Number,
  uid: {type:Schema.Types.ObjectId,ref:'users'},
  lecturefiles:[{
    file:String,
    filename:String,
    posted:Date
  }],
  permissioncode:[{
    code:String,
    used:Number,
    uid: {type:Schema.Types.ObjectId,ref:'users'}
  }],
announcement:[{
  header:String,
  bodyText:String,
  plainText:String,
  posted:Date
  }],
  assignments:[{
    header:String,
    bodyText:String,
    plainText:String,
    posted:Date,
    due:Date,
    available:Date, 
    points:Number,
    submission:[{
      uid: {type:Schema.Types.ObjectId,ref:'users'},
      grades:Number,
      submissionfile:[{
        file:String,
        filename:String
      }]
    }],
  }],
  quiz:[{
    heading:String,
    description:String,
    posted:Date,
    due:Date,
    availablefrom:Date,
    availableto:Date,
    timelimit:Number,
    published:Number,
    points:Number,
    questions:[{
      question:String,
      answer:String,
      options:[{
        type:String
      }]
    }],
    quizsubmission:[{
      uid:{type:Schema.Types.ObjectId,ref:'users'},
      answers:[{
        questionId:Schema.Types.ObjectId,
        answer:String
      }],
      grades:Number
    }]
  }]
});

var userModel = mongoose.model('users', userSchema );
var courseModel = mongoose.model('courses', courseSchema );

module.exports={
    userModel,
    clusterSchema,
    sensorSchema,
    courseModel
}