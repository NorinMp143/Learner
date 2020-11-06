const express = require('express');
const router = express.Router();

const Student = require('../modals/student');

const { isLoggedIn, isStudent } = require('../middlewares/auth');

router.get('/classes', isLoggedIn, isStudent, (req,res,next)=>{
  Student.getStudentByUsername(req.user.username,(err, student)=>{
    if(err) throw err;
    res.render('students/classes',{ student: student});
  });
});

router.post('/classes/register', isLoggedIn, isStudent, (req,res)=>{
  info = [];
  info['student_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Student.register(info, (err, student)=>{
    if(err) throw err;
    console.log(student);
  });

  req.flash('success_msg','you are now registered to study in this class');
  res.redirect('/students/classes');
});

module.exports = router;
