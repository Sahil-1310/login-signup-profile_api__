let mongoose=require('mongoose');
const signupmodel=new mongoose.Schema({
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
        type:String,required:true
    },
    email:{
        type:String,required:true
    }, 
    date:{
        type:Date,default:new Date()
    } 
});
const signup = mongoose.model('signup', signupmodel)
module.exports = signup