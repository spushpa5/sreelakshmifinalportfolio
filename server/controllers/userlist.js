let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
//Connect to our user Model
let User = require('../models/user');



module.exports.contactListDisplay =  async function(req, res, next) {
    try{
        const Users = await User.find().sort({name:-1}).exec();
        

    
    // return console.log(loginList);
    res.render('user/buisinesscontact',{title: 'Buisiness Contact',Users: Users,displayName: req.user ? req.user.displayName : ''});

    }
    catch(e){
        console.error(e);

    }   

}
/**Get Contact Info */
module.exports.contactAdd = (req,res,next) =>{
    res.render('user/add',{title: 'Contact Add'});
    // res.render('user/buisinesscontact',{title: 'Buisiness Contact',User: User});

}


/**Post route for processing the Add page --> CREATE operations */
module.exports.postContactAdd = (req,res,next) =>{
    
    let newUser = User({
        name:req.body.name,
        username:req.body.usrname,
        password:req.body.pwd,
        email:req.body.email,
        phone:req.body.phone
   
    });
    console.log(newUser);

    User.create(newUser,(err,newUser) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/buisiness-contact');
        }
    })

}

/**Get route for displaying the Edit page --> UPDATE operations */
module.exports.getUpdateContact = (req,res,next) =>{
    let id = req.params.id;
    User.findById(id,(err,user) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            // res.render('user/add',{title: 'Contact Add'});
            res.render('user/edit',{title : 'Edit User Info',User: user,
            displayName: req.user ? req.user.displayName : ''});
        }
    });

}

/**Post route for processing the Edit page --> UPDATE operations */

module.exports.postUpdateContact = (req,res,next) =>{
    let id = req.params.id;
    let updateUser = User({
        "_id":id,
        name:req.body.name,
        username:req.body.usrname,
        password:req.body.pwd,
        email:req.body.email,
        phone:req.body.phone
   
    });

    User.updateOne({_id: id},updateUser,(err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/buisiness-contact');
        }
    });


}

/**Get route for processing the Deletion --> DELETE operations */

module.exports.deleteContact = (req,res,next) =>{
    let id = req.params.id;
    User.remove({_id: id},(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }

        else
        {
            //refresh the contact list
            res.redirect('/buisiness-contact');
        }
    })

}