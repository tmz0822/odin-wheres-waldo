const prisma = require('../config/prisma');

async function getTargetCoordinates(imageId, skip) {
  try {
    const coordinates = await prisma.target.findFirstOrThrow({
      where: {
        imageId: Number(imageId),
      },
      skip: Number(skip),
    });

    return coordinates;
  } catch (error) {
    console.log('Get target coordinates failed: ', error);
  }
}

module.exports = { getTargetCoordinates };
