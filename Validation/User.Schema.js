const joi =require('@hapi/joi');

//Validation 
const SignUp=joi.object({
firstname:joi.string().min(6).required(),
lastname:joi.string().min(6).required(),
password:joi.string().min(6).required(),
phone_no:joi.number().invalid().min(10000000000).message("Invalid Mobile").max(9999999999),
email:joi.string().required().email().lowercase(),
password:joi.string().min(6).required().regex(/^[\w]{8,30}$@#/).required(),
confirmpassword:joi.string().min(6).required().regex(/^[\w]{8,30}$@#/).required()
})

module.exports=SignUp;