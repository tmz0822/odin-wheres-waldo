const gameQueries = require('../db/gameQueries');

async function createGameSession(req, res) {
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
    const gameSession = await gameQueries.updateTargetFound(sessionId);

    return res.json({ success: true, gameSession });
  } catch (error) {
    console.log('Failed to start game session: ', error);
    return res.json({ success: false, error });
  }
}

async function endGameSession(req, res) {
  try {
    const sessionId = req.params.sessionId;
    const data = req.body;
    const gameSession = await gameQueries.endGameSession(sessionId, data);

    return res.json({ success: true, gameSession });
  } catch (error) {
    console.log('Failed to start game session: ', error);
    return res.json({ success: false, error });
  }
}

async function getHighScores(req, res) {
  try {
    const imageId = req.params.imageId;
    const highScores = await gameQueries.getHighScores(imageId);

    return res.json({ success: true, highScores });
  } catch (error) {
    console.log('Failed to get high scores: ', error);
    return res.json({ success: false, error });
  }
}

module.exports = {
  createGameSession,
  updateTargetFound,
  endGameSession,
  getHighScores,
};
