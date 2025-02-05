var express = require('express');
var router = express.Router();
const authmiddlewares = require('../middlewares/authmiddlewares');

const osController = require('../controllers/osController');
/* GET home page. */
router.get('/osInformations',authmiddlewares, osController.getOsInformation);

module.exports = router;
