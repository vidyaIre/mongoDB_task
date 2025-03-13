const { addState, getStatePopulation } = require('../controllers/stateController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addState', errorHandler, addState);
router.get('/:name/population',errorHandler,getStatePopulation);

module.exports = router;