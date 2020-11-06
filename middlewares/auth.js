module.exports.isLoggedIn = (req,res,next) =>{
  if(!req.user){
    res.redirect('/');
  }
  next();
}
module.exports.isStudent = (req,res,next) =>{
  if(req.user.type!='student'){
    res.redirect('/');
  }
  next();
}
module.exports.isInstructor = (req,res,next) =>{
  if(req.user.type!='instructor'){
    res.redirect('/');
  }
  next();
}