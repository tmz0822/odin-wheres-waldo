const imagesQueries = require('../db/imagesQueries');

async function getImages(req, res) {
  try {
    const images = await imagesQueries.getAllImages();

    res.json({ success: true, images });
  } catch (error) {
    console.log('Get images failed: ', error);
    res.json({ success: false, message: error.message });
  }
}

async function getImageById(req, res) {
  try {
    const { imageId } = req.params;
    const image = await imagesQueries.getImageById(imageId);

    console.log(image);

    res.json({ success: true, image });
  } catch (error) {
    console.log('Get image failed: ', error);
    res.json({ success: false, message: error.message });
  }
}

module.exports = { getImages, getImageById };
