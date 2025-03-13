const { addState, getStatePopulation, totalPopulation, avgPopulationDensity, getAllStates } = require('../controllers/stateController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addState', errorHandler, addState);
router.get('/:name/population',errorHandler,getStatePopulation);
router.get('/:name/totalPopulation', errorHandler, totalPopulation);
router.get('/avgPopulationDensity', errorHandler,avgPopulationDensity);
router.get('/getAllStates', errorHandler, getAllStates);

module.exports = router;