let express = require('express');
let router = express.Router();
let bycrpt = require('bcrypt');
let jwt = require('jsonwebtoken');
let signup = require('../Model/Schema');
let sendservice = require('../Mail/message')
require('dotenv').config();




// const schema = joi.object({
//     firstname: joi.string().required(),
//     lastname: joi.string().required(),
//     phone_no: joi.number().invalid().min(1000000000).message("Invalid Mobile").max(9999999999).message("Invalid Moblie_no"),
//     email: joi.string().required().email().lowercase(),
//     password: joi.string().min(6).required().regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
//     confirmpassword: joi.string().min(6).required().regex(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/).required()
// })

router.post('/SignUp', async (req, res) => {
    try {
        // const {error}=schema.validate(req.body);
        // if(error) return res.status(400).send(error.details[0].message);

        //If user email already exit in the database
        
         const emailExit= await signup.findOne({email:req.body.email});
         if(emailExit) return res.status(401).send({
             status:401,
             message:"Email Already Exit"   
         });

        const salt = await bycrpt.genSalt(10);
        const hashedpassword = await bycrpt.hash(req.body.password, salt);
        req.body.password = hashedpassword;
        const data = await signup.create(req.body);
        data.save()
        if(data != null) {
            await sendservice.sendEmail(data)
        }
        res.json(data);
    } catch (error) {
        res.json(`Error:${error}`);
        console.log(error);
    }
});


router.post('/Login', async (req, res) => {
    try {
        const data = await signup.findOne({ email: req.body.email })
        if (data == null) {
            res.sendStatus(401).send({
                status: 401,
                message: "Invalid User"
            });
        }
        const validPassword = await bycrpt.compare(req.body.password, data.password);
        console.log(validPassword)
        if (validPassword) {
            const accesssToken = jwt.sign({ _id1: data._id }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accesssToken });
        } else  {
            return res.status(401).send({
                status: 401,
                message: "Invalid User"
            });
        }
    } catch (error) {
        res.json(`Error: ${error}`);
    }
})
router.get('/Profile', authentication, async (req, res) => {
    console.log(req.decoded);
    try {
        const data = await signup.findById(req.decoded._id1)
        console.log(data);
        res.json(data);
    } catch (error) {
        res.json(`Error: ${error}`);
    }
});


//MiddleWare
function authentication(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader.split(' ')[1]);
    // console.log(req.headers.authorization);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.decoded = decoded;
        // console.log(req.decoded);
    })
    next();
}

module.exports = router;
