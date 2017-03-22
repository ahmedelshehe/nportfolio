var mongoose =require('mongoose');
var clientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
var client=mongoose.model("client",clientSchema);
module.exports=client;
