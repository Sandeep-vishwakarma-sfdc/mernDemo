const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const cors = require('cors');
const DBSERVERURL = 'mongodb+srv://Sandeep:Sandeep@123@mernstack1db.fvnwp.mongodb.net/test'
const DBLOCALURL = 'mongodb://localhost:27017/marnstackDB?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(DBLOCALURL,{useNewUrlParser:true});

app.use(cors());
app.use(express.json());

app.post('/insert',async (req,res)=>{
   let friend = new FriendModel({
       name:req.body.name,
       age:req.body.age
   });
   await friend.save();
   FriendModel.find({},(err,result)=>{
       if(result){
           console.log('Result ',result);
           res.send(result);
       }
   })
});

app.get('/read',async (req,res)=>{
    FriendModel.find({},(err,result)=>{
        if(err)
            console.log('err->'+err);
        else{
            res.send(result);
        }    
    });
});
app.get('/',async (req,res)=>{
    res.send('<h1>Home page</h1>');
});
app.listen(5000,()=>console.log('server is running'));