var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Include User Model
var User = require('../modals/user');
// Include Student Model
var Student = require('../modals/student');
// Include Instructor Model
var Instructor = require('../modals/instructor');
const { validationResult, check } = require('express-validator');

// User Register
router.get('/register', function(req, res, next) {
  res.render('users/register');
});

// Register User
router.post('/register',async (req,res,next)=>{
  // Get Form Values
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var street_address = req.body.street_address;
  var city = req.body.city;
  var zip = req.body.zip;
  var state = req.body.state;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var type = req.body.type;

  // Form Validation
  await check('first_name','First name field is required').notEmpty().run(req);
  await check('last_name','Last name field is required').notEmpty().run(req);
  await check('email','Email field is required').notEmpty().run(req);
  await check('email','Email must be a valid email address').isEmail().run(req);
  await check('username','Username field is required').notEmpty().run(req);
  await check('password','Password field is required').notEmpty().run(req);
  await check('password2','Passwords do not match').equals(req.body.password).run(req);

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    res.render('users/register',{
      errors: errors.array()
    })
  }else{
    var newUser = new User({
      email: email,
      username: username,
      password: password,
      type: type
    });
    if(type == 'student'){
      console.log('Registering Student...');
      var newStudent = new Student({
        first_name: first_name,
        last_name: last_name,
        address:[{
          street_address: street_address,
          state: state,
          city: city,
          zip: zip
        }],
        email: email,
        username: username
      });

      User.saveStudent(newUser,newStudent,(err,user)=>{
        console.log('Student created');
      });
    }else{
      console.log('Registering Instructor...');
      var newInstructor = new Instructor({
        first_name: first_name,
        last_name: last_name,
        address:[{
          street_address: street_address,
          state: state,
          city: city,
          zip: zip
        }],
        email: email,
        username: username
      });

      User.saveInstructor(newUser,newInstructor,(err,user)=>{
        console.log('Instructor created');
      });
    }

    req.flash('success_msg','User Added');
    res.redirect('/');
  }
});

passport.serializeUser((user, done)=>{
  done(null, user._id);
});

passport.deserializeUser((id, done)=>{
  User.getUserById(id, (err, user)=>{
    done(err, user);
  });
});

router.post('/login',passport.authenticate('local',{failureRedirect:'/',failureFlash:true}),(req,res,next)=>{
  req.flash('success_msg','you are now logged in');
  var usertype = req.user.type;
  res.redirect('/'+usertype+'s/classes');
})

passport.use(new LocalStrategy(
  (username, password, done)=>{
    User.getUserByUsername(username, (err, user)=>{
      if(err) throw err;
      if(!user){
        return done(null, false, { message : 'Unknown username '+ username });
      }
      User.comparePassword(password,user.password, (err, isMatch)=>{
        if(err) return done(err);
        if(isMatch){
          return done(null, user);
        }else{
          console.log('Invalid Password');
          // Success Message
          return done(null,false,{message:'Invalid password'});
        }
      })
    })
  }
));

// Log User Out
router.get('/logout',(req,res,next)=>{
  req.logout();
  // Success Message
  req.flash('success_msg', 'you are logged out');
  res.redirect('/');
});

module.exports = router;
