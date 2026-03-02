const router = require('express').Router();
const { signup, login, getMe } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
