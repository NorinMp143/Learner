var express = require('express');
var router = express.Router();

var Class = require('../modals/class');
var Student = require('../modals/student');
var Instructor = require('../modals/instructor');

const { isLoggedIn } = require('../middlewares/auth');

/* Class page. */
router.get('/', function(req, res, next) {
  Class.getClasses((err, classes)=>{
    res.render('classes/index', { 
      classes: classes
    });
  },3)
});

// Class Detail Page
router.get('/:id/details', function(req, res, next) {
  if(req.user){
    Class.getClassById([req.params.id], (err, classname) => {
      var registered = false;
      if(req.user.type == 'student'){
        Student.getStudentByUsername(req.user.username, (err, student)=>{
          for(i=0;i<student.classes.length;i++){
            if(student.classes[i].class_id[0] == req.params.id){
              registered = true;
              break;
            }
          }
          res.render('classes/details', { 
            class: classname, registered: registered
          });
        });
      }
      else if(req.user.type == 'instructor'){
        Instructor.getInstructorByUsername(req.user.username, (err, instructor)=>{
          for(i=0;i<instructor.classes.length;i++){
            if(instructor.classes[i].class_id[0] == req.params.id){
              registered = true;
              break;
            }
          }
          res.render('classes/details', { 
            class: classname, registered: registered
          });
        });
      }
    });
  }else{
    Class.getClassById([req.params.id], (err, classname) => {
      res.render('classes/details', { 
        class: classname
      });
    });
  }
});

// Get All lessons
router.get('/:id/lessons',isLoggedIn, function(req, res, next) {
  Class.getClassById([req.params.id], (err, classname) => {
    res.render('classes/lessons', { 
      class: classname
    });
  });
});

// Get Lesson
router.get('/:id/lessons/:lesson_num', isLoggedIn, function(req, res, next) {
  Class.getClassById([req.params.id], (err, classname) => {
    var lesson;
    for(i=0; i<classname.lessons.length; i++){
      if(classname.lessons[i].lesson_number == req.params.lesson_num){
        lesson = classname.lessons[i];
        break;
      }
    }
    res.render('classes/lesson', { 
      class: classname, lesson: lesson
    });
  });
});

module.exports = router;
