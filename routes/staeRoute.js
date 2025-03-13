const { addState, getStatePopulation, totalPopulation } = require('../controllers/stateController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addState', errorHandler, addState);
router.get('/:name/population',errorHandler,getStatePopulation);
router.get('/:name/totalPopulation', errorHandler, totalPopulation);

module.exports = router;