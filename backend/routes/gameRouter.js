const { Router } = require('express');

const gameRouter = Router();

// Manage game sessions such as start game/end game

const gameController = require('../controllers/gameController');

gameRouter.post('/:imageId/start', gameController.startGameSession);
gameRouter.put('/:sessionId/end', gameController.endGameSession);
gameRouter.put('/:sessionId/found', gameController.updateTargetFound);

module.exports = gameRouter;
