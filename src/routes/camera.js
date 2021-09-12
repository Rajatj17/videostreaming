const router = require('express').Router();

const { 
   CameraController
} = require('../controllers');

const cameraInstance = new CameraController();

router.post('/', cameraInstance.Register);

router.ger('/', cameraInstance.GetAll);

router.get('/:ip', cameraInstance.GetCameraByIP);

router.patch('/:id', cameraInstance.UpdateCameraMeta);

module.exports = router;
