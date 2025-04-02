const prisma = require('../config/prisma');

async function getAllImages() {
  try {
    const images = await prisma.image.findMany({
      include: {
        _count: {
          select: { targets: true },
        },
      },
    });

    return images;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

module.exports = { getAllImages };
