const prisma = require('../config/prisma');

async function getTarget(imageId, skip) {
  try {
    const target = await prisma.target.findFirstOrThrow({
      where: {
        imageId: Number(imageId),
      },
      skip: Number(skip),
    });

    return target;
  } catch (error) {
    console.log('Get target  failed: ', error);
  }
}

module.exports = { getTarget };
