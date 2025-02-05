var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/uploadFile')
const ValidationUser = require('../middlewares/validationUser');
const authmiddlewares = require('../middlewares/authmiddlewares');
/* GET users listing. */
router.get('/getAllUsers',authmiddlewares,userController.getAllUsers );
router.get('/getSortUsersByAge',authmiddlewares,userController.getSortUsersByAge );
router.get('/getSortUsersByDate',authmiddlewares,userController.getSortUsersByDate );
router.get('/searchUsersByUsername',authmiddlewares,userController.searchUsersByUsername );
router.post('/addUserClient',authmiddlewares,ValidationUser,userController.addUserClient );
router.post('/addUserWithImg',authmiddlewares,uploadFile.single("image_user"),userController.addUserWithImg );
router.put('/updateUser/:id',authmiddlewares,userController.updateUser );
router.put('/updatepassword/:id',authmiddlewares,userController.updatepassword );
router.put('/updateUserWithImg/:id',authmiddlewares,uploadFile.single("image_user"),userController.updateUserWithImg );
router.delete('/deleteUser/:id',authmiddlewares,userController.deleteUser );


module.exports = router;
