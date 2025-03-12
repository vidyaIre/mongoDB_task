const { addState } = require('../controllers/stateController');
const errorHandler = require('../middleware/errorHandler');

const router = require('express').Router();

router.post('/addState', errorHandler, addState);

module.exports = router;