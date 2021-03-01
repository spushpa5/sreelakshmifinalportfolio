let mongoose = require('mongoose');

//create model class
let userModel = mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    phone:String
   
},
{
    collection: "userlist"
});

module.exports = mongoose.model('user',userModel);
