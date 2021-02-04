let mongoose=require('mongoose');
let schema=new mongoose.Schema({
    firstname:{
        type:String,required:true
    },
    lastname:{
        type:String,required:true
    },
    password:{
        type:String,required:true
    },
    phone_no:{
        type:Number,required:true
    },
    email:{
        type:String,required:true
    }, 
    date:{
        type:Date,default:Date.now
    } 
});
module.exports=mongoose.model("signup",schema);