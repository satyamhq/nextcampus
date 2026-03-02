const router = require('express').Router();
const { getDashboard, saveCollege, saveComparison, updateProfile } = require('../controllers/dashboardController');
const protect = require('../middleware/auth');

router.use(protect); // All dashboard routes are protected
router.get('/', getDashboard);
router.post('/save-college', saveCollege);
router.post('/save-comparison', saveComparison);
router.put('/profile', updateProfile);

module.exports = router;
