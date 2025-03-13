const { addDistrict, updateDistrictPopulaton, deleteDistrict, groupAndSortDistrictByPopulation, getDistrictWithState, getAllDistricts } = require('../controllers/districtController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addDistrict', errorHandler, addDistrict);
router.put('/:name/population', errorHandler, updateDistrictPopulaton);
router.delete('/:name', errorHandler, deleteDistrict);
router.get('/getGASDBP', errorHandler, groupAndSortDistrictByPopulation);
router.get('/getDistrictWithState',errorHandler,getDistrictWithState);
router.get('/getAllDistricts', errorHandler, getAllDistricts);

module.exports = router;