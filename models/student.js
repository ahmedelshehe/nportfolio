var mongoose=require('mongoose');
module.exports={
    work:require('../models/work')};
var work=mongoose.model('work');   
var studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    studentPortfolio:{
        name:{
            type:String
        },
        img:{ data:Buffer, contentType: String }

    },
    works : [mongoose.Schema.Types.Mixed]

});
var student=mongoose.model("student",studentSchema);  
module.exports=student;