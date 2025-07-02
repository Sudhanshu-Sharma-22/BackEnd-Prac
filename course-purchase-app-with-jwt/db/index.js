const mongoose = require('mongoose');
const { title } = require('process');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(`mongodb+srv://sudhanshusharmawork22:79w7rzbyx3dylTtD@course-cohort.jqzru1e.mongodb.net/cohort-courses-application-with-jwt`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    image:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}
