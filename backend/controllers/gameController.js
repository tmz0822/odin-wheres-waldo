const gameQueries = require('../db/gameQueries');

async function startGameSession(req, res) {
  try {
    const imageId = req.params.imageId;

    const gameSession = await gameQueries.createGameSession(imageId);

    return res.json({ success: true, gameSession });
  } catch (error) {
    console.log('Failed to start game session: ', error);
    return res.json({ success: false, error });
  }
}

async function updateTargetFound(req, res) {
  try {
    const sessionId = req.params.sessionId;

    const updatedSession = await gameQueries.updateTargetFound(sessionId);

    return res.json({ success: true, updatedSession });
  } catch (error) {
    console.log('Failed to update target found: ', error);
    return res.json({ success: false, error });
  }
}

async function endGameSession(req, res) {
  try {
    const sessionId = req.params.sessionId;

    const updatedSession = await gameQueries.endGameSession(sessionId);

    return res.json({ success: true, updatedSession });
  } catch (error) {
    console.log('Failed to end game session: ', error);
    return res.json({ success: false, error });
  }
}

module.exports = { startGameSession, updateTargetFound, endGameSession };
