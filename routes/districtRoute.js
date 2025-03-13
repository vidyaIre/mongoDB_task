const { addDistrict, updateDistrictPopulaton, deleteDistrict } = require('../controllers/districtController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addDistrict', errorHandler, addDistrict);
router.put('/:name/population', errorHandler, updateDistrictPopulaton);
router.delete('/:name', errorHandler, deleteDistrict);

module.exports = router;