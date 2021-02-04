var user=require('../Validation/User.Schema');

module.exports={
    userValidation:async(req,res,next)=>{
        const value=await user.validate(req.body);
        if(value.error)
        {
            res.json({
                message:value.error.details[0].message
            })
        }else{
            next();
        }
    }
}