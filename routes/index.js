var express = require('express');
var fs=require('fs');
var path=require('path');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var bodyParser = require('body-parser').json();
var multiparty = require('multiparty');
var mongoose=require('mongoose');
mongoose.Promise = global.Promise;



var router = express.Router();
module.exports={
  student:require('../models/student'),
  work:require('../models/work')
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/portfolio', function(req, res, next) {
  res.render('portfolio');
});
router.get('/about',function(req,res,next){
  res.render('about');
});
router.get('/contact',function(req,res,next){
  res.render('contact');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/signin', bodyParser,function(req,res,next){
    console.log(req.body);
    var student = mongoose.model('student');
    student.findOne({name:req.body.username,password:req.body.password},function(err,doc){
      console.log(doc);
      var id=doc._id;
      req.session.sid=id;
      console.log(req.session.sid);
      
      res.render('portfolio',{title:req.body.username,works:doc.works});
    });
      
      
});
    
router.post('/addstudent',upload.single('img'),function(req,res,next){
  req.check('reg_password', 'Password is invalid').isLength({min: 4}).equals(req.body.reg_password_confirm);
  console.log(req);
 var student = mongoose.model('student');
 
 
  var s=new student({
    name:req.body.reg_username,
    password:req.body.reg_password_confirm,
    studentPortfolio:{
      name:req.body.portfolioName,
      img:{
        data:fs.readFile(req.file.path),
        contentType:'image/png'
      }
      
    }
  

  });
  console.log(s);
  s.save(function(err,s){
      if(err){
        console.log(err);
        
      };
  });
 

  

    res.redirect('/login');

  });
   router.post('/addwork',bodyParser,upload.single('img'),function(req,res,next){

        console.log(req.body);
    var student = mongoose.model('student');
    var work=mongoose.model('work');

    var w=new work({
      description:req.body.title,
      url:req.body.URL,
      img:req.file.filename

    });

    var sid=req.session.sid;
    student.findById(sid,function(err,doc){
      doc.works.push(w);
      console.log(w);
      doc.save(function(err){
        if(err){
        console.log(err);

        
      };

      });
      res.render('portfolio',{title:doc.portfolioName,works:doc.works});

    });



  });
  


   
  


module.exports = router;
