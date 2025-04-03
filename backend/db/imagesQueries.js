const prisma = require('../config/prisma');

async function getAllImages() {
  try {
    const images = await prisma.image.findMany({
      include: {
        targets: true,
      },
    });

    return images;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function getImageById(imageId) {
  try {
    const image = await prisma.image.findFirst({
      where: {
        id: Number(imageId),
      },
      include: {
        targets: true,
      },
    });

    return image;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

module.exports = { getAllImages, getImageById };
