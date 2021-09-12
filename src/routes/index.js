const router = require('express').Router();

const cameraRoutes = require('./camera');

router.use('/camera', cameraRoutes);

module.exports = router;