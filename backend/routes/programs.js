const router = require('express').Router();
const { getPrograms, getProgram } = require('../controllers/programController');

router.get('/', getPrograms);
router.get('/:id', getProgram);

module.exports = router;
