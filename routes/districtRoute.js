const { addDistrict } = require('../controllers/districtController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addDistrict', errorHandler, addDistrict);

module.exports = router;