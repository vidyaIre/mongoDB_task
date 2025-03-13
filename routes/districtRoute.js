const { addDistrict, updateDistrictPopulaton, deleteDistrict, groupAndSortDistrictByPopulation } = require('../controllers/districtController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addDistrict', errorHandler, addDistrict);
router.put('/:name/population', errorHandler, updateDistrictPopulaton);
router.delete('/:name', errorHandler, deleteDistrict);
router.get('/getGASDBP', errorHandler, groupAndSortDistrictByPopulation);

module.exports = router;