const router = require('express').Router();
const protect = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
    getStats, createCollege, updateCollege, deleteCollege,
    getUsers, deleteUser,
    createProgram, updateProgram, deleteProgram
} = require('../controllers/adminController');

router.use(protect, admin); // All admin routes require auth + admin role
router.get('/stats', getStats);
router.post('/colleges', createCollege);
router.put('/colleges/:id', updateCollege);
router.delete('/colleges/:id', deleteCollege);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.post('/programs', createProgram);
router.put('/programs/:id', updateProgram);
router.delete('/programs/:id', deleteProgram);

module.exports = router;
