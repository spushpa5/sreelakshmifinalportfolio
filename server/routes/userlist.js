let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let jwt = require('jsonwebtoken');
//Connect to our user Model
// let User = require('../models/user');

let userController = require('../controllers/userlist');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


router.get('/', userController.contactListDisplay);

/**Get route for displaying the Add page --> CREATE operations */
router.get('/add',requireAuth, userController.contactAdd);

/**Post route for processing the Add page --> CREATE operations */
router.post('/add',requireAuth,userController.postContactAdd);
/**Get route for displaying the Edit page --> UPDATE operations */
router.get('/edit/:id',requireAuth,userController.getUpdateContact);
/**Post route for processing the Edit page --> UPDATE operations */
router.post('/edit/:id', requireAuth,userController.postUpdateContact);
/**Get route for processing the Deletion --> DELETE operations */
router.get('/delete/:id',requireAuth, userController.deleteContact);
module.exports= router;