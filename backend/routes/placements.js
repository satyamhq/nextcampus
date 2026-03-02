const router = require('express').Router();
const { getPlacements } = require('../controllers/placementController');

router.get('/', getPlacements);

module.exports = router;
