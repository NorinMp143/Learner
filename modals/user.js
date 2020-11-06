var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
async = require('async');

var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  emial: {
    type: String
  },
  password: {
    type: String,
    bcrypt: true
  },
  type: {
    type: String
  }
});

var User = module.exports = mongoose.model('User',userSchema);

// Get User By Id
User.getUserById = (id, callback) => {
  User.findById(id, callback);
}

// Get User By Username
User.getUserByUsername = (username, callback) => {
  var query = {username: username};
  User.findOne(query, callback);
}

// Compare Password
User.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null,isMatch);
  })
}

// Create Student User
User.saveStudent = (newUser, newStudent, callback) => {
  bcrypt.hash(newUser.password, 10, (err,hash)=>{
    if(err) throw err
    // Set Hash
    newUser.password = hash;
    console.log("Student is being saved.");
    async.parallel([()=>newUser.save(),()=>newStudent.save()],callback);
  })
}

// Create Instructor User
User.saveInstructor = (newUser, newInstructor, callback) => {
  bcrypt.hash(newUser.password, 10, (err,hash)=>{
    if(err) throw err
    // Set Hash
    newUser.password = hash;
    console.log("Instructor is being saved.");
    async.parallel([()=>newUser.save(),()=>newInstructor.save()],callback);
  })
}