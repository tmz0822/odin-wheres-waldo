const prisma = require('../config/prisma');

async function createGameSession(imageId) {
  try {
    const session = await prisma.gameSession.create({
      data: {
        image: {
          connect: {
            id: Number(imageId),
          },
        },
      },
    });

    return session;
  } catch (error) {
    console.error(error);
  }
}

async function updateTargetFound(sessionId) {
  try {
    const gameSession = await prisma.gameSession.findUnique({
      where: {
        id: Number(sessionId),
      },
    });

    const updatedGameSession = await prisma.gameSession.update({
      where: {
        id: Number(sessionId),
      },
      data: {
        found: gameSession.found + 1,
      },
    });

    return updatedGameSession;
  } catch (error) {
    console.error(error);
  }
}

async function endGameSession(sessionId, data) {
  try {
    const updatedGameSession = await prisma.gameSession.update({
      where: {
        id: Number(sessionId),
      },
      data: {
        username: data.username ? data.username : null,
        timeSpent: data.time,
      },
    });

    return updatedGameSession;
  } catch (error) {
    console.error(error);
  }
}

async function getHighScores(imageId, limit = 10) {
  try {
    const highScores = await prisma.gameSession.findMany({
      where: {
        imageId: Number(imageId),
        username: { not: null },
        timeSpent: { not: null },
      },
      take: limit,
      orderBy: {
        timeSpent: 'asc',
      },
    });

    return highScores;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createGameSession,
  updateTargetFound,
  endGameSession,
  getHighScores,
};
