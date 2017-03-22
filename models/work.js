var mongoose = require('mongoose');
var workSchema= new mongoose.Schema(
    {
        description:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true

        },
        img:{
            type:String
        }
    }
);
var work = mongoose.model("work", workSchema);
module.exports=work;
