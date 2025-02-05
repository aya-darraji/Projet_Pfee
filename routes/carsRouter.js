var express = require('express');
var router = express.Router();
const carController = require('../controllers/carController');
const authmiddlewares = require('../middlewares/authmiddlewares');

/* GET home page. */
router.get('/getCars',authmiddlewares, carController.getCars);
router.get('/getCarById/:id',authmiddlewares, carController.getCarById);
router.post('/AddCar',authmiddlewares, carController.AddCar);
router.put('/UpdateCar/:id',authmiddlewares, carController.UpdateCar);
router.put('/affectation',authmiddlewares, carController.affectation);
router.put('/desaffectation',authmiddlewares, carController.desaffectation);
router.delete('/DeleteCar/:id',authmiddlewares, carController.DeleteCar);

module.exports = router;
