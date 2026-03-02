const router = require('express').Router();
const { getExams, getExam } = require('../controllers/examController');

router.get('/', getExams);
router.get('/:id', getExam);

module.exports = router;
