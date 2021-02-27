const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const DBSERVERURL = 'mongodb+srv://Sandeep:Sandeep@123@mernstack1db.fvnwp.mongodb.net/test'
const DBLOCALURL = 'mongodb://localhost:27017/marnstackDB?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(DBLOCALURL,{useNewUrlParser:true});

app.get('/insert',async (req,res)=>{
   let friend = new FriendModel({
       name:'sandeep',
       age:22
   });
   await friend.save();
   res.send('Friend inserted');
});

app.listen(5000,()=>console.log('server is running'));