const router = require('express').Router();
const { calculateEMI, checkEligibility, applyLoan } = require('../controllers/loanController');
const protect = require('../middleware/auth');

router.post('/calculate', calculateEMI);
router.post('/eligibility', checkEligibility);
router.post('/apply', protect, applyLoan);

module.exports = router;
