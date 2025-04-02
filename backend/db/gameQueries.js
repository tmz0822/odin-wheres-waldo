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
    const session = await prisma.gameSession.findUnique({
      where: {
        id: Number(sessionId),
      },
    });

    const updatedSession = await prisma.gameSession.update({
      data: {
        found: session.found + 1,
      },
      where: { id: Number(sessionId) },
    });

    return updatedSession;
  } catch (error) {
    console.error(error);
  }
}

async function endGameSession(sessionId) {
  try {
    const updatedSession = await prisma.gameSession.update({
      data: {
        endTime: new Date(),
      },
      where: {
        id: Number(sessionId),
      },
    });

    return updatedSession;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createGameSession, updateTargetFound, endGameSession };
