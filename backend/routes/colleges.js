const router = require('express').Router();
const { getColleges, getCollege, compareColleges, searchSuggestions } = require('../controllers/collegeController');

router.get('/search/suggestions', searchSuggestions);
router.get('/compare', compareColleges);
router.get('/', getColleges);
router.get('/:id', getCollege);

module.exports = router;
