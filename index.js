let router=require('./Router/router');
let mongoose=require('mongoose');
let express=require('express');
let app=express();

app.use(express.json()) //it cannot read property that we send json data so we have tell express that we are sending json data

mongoose.connect('mongodb://localhost:27017/apptunix',{
    useNewUrlParser:true,useUnifiedTopology:true},
    ()=>{console.log("connected to mongodb")});

app.use('/',router);
app.listen(4000,()=>{console.log("connected to 4000")});
