var express = require('express');
var router = express.Router();

var Class = require('../modals/class');

/* GET home page. */
router.get('/', function(req, res, next) {
  Class.getClasses((err, classes)=>{
    res.render('index', { 
      classes: classes
    });
  },3)
});

module.exports = router;
