//require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userModel = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required:'Username is required'
        },
        /*
        password:
        {
            tupe: String,
            default: '';
            trim:true,
            required:'password is required'
        }
        */
       email:
       {
            type: String,
            default: "",
            trim: true,
            required:'email address is required'
       },
       displayName:
       {
            type: String,
            default: "",
            trim: true,
            required:'Display Name is required'
       },
       created:
       {
            type: Date,
            default: "",
           
       },
       update:
       {
            type: Date,
            default: "",
           
       }


    },
    {
        collection: "login"
    }
);

//Configure options for user model

let options = ({missingPasswordError: 'Wrong/Missing Password'});
userModel.plugin(passportLocalMongoose,options);
module.exports.userModel = mongoose.model('userModel',userModel);