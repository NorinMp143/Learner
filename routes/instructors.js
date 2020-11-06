const express = require('express');
const router = express.Router();

const Instructor = require('../modals/instructor');
const Class = require('../modals/class');

const { isLoggedIn, isInstructor } = require('../middlewares/auth');

router.get('/classes', isLoggedIn, isInstructor, (req,res,next)=>{
  Instructor.getInstructorByUsername(req.user.username,(err, instructor)=>{
    if(err) throw err;
    res.render('instructors/classes',{ instructor: instructor});
  });
});

router.post('/classes/register', isLoggedIn, isInstructor, (req,res)=>{
  info = [];
  info['instructor_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Instructor.register(info, (err, instructor)=>{
    if(err) throw err;
    console.log(instructor);
  });

  req.flash('success_msg','you are now registered to teach this class');
  res.redirect('/instructors/classes');
});

router.get('/classes/:id/lessons/new', isLoggedIn, isInstructor, (req,res,next)=>{
  res.render('instructors/newlesson',{class_id:req.params.id});
});

router.post('/classes/:id/lessons/new', isLoggedIn, isInstructor, (req,res,next)=>{
  // Get Values
  var info = [];
  info['class_id'] = req.params.id;
  info['lesson_number'] = req.body.lesson_number;
  info['lesson_title'] = req.body.lesson_title;
  info['lesson_body'] = req.body.lesson_body;

  Class.addLesson(info, (err, lesson)=>{
    console.log('Lesson Added...');
  });

  req.flash('success_msg','Lesson Added');
  res.redirect('/instructors/classes');
});

module.exports = router;
