let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index')
console.log("Hello");

/* GET home page. */
router.get('/', indexController.displayHomePage);
router.get('/about', indexController.displayAboutPage);
router.get('/home', indexController.displayHomePage);
router.get('/project', indexController.displayProjectPage);
router.get('/services',indexController.displayServicesPage);
router.get('/contact',indexController.displayContactPage);
/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;


