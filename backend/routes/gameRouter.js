const { Router } = require('express');

const gameRouter = Router();

// Manage game sessions such as start game/end game

const gameController = require('../controllers/gameController');

gameRouter.get('/:imageId', gameController.getHighScores);

gameRouter.post('/:imageId/create', gameController.createGameSession);

gameRouter.put('/:sessionId/found', gameController.updateTargetFound);
gameRouter.put('/:sessionId/end', gameController.endGameSession);

module.exports = gameRouter;
