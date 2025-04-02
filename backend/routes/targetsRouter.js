const { Router } = require('express');

const targetsRouter = Router();

const targetsController = require('../controllers/targetsController');

targetsRouter.post('/:imageId', targetsController.verifyTargets);

module.exports = targetsRouter;
