var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const ValidationUser = require('../middlewares/validationUser');
const authmiddlewares = require('../middlewares/authmiddlewares');

/* GET users listing. */
router.get('/getUserConnect',authmiddlewares,authController.getUserConnect );
router.get('/logout',authmiddlewares,authController.logout );
router.post('/login',authController.login );
router.post('/forgetPassword',authController.forgetPassword );
router.post('/addAcount',authController.addAcount );
router.get("/VerificationEmail", authController.VerificationEmail);


module.exports = router;
