const imagesQueries = require('../db/imagesQueries');

async function getImages(req, res) {
  try {
    const images = await imagesQueries.getAllImages();

    res.json({ success: true, images });
  } catch (error) {
    console.log('Get image failed: ', error);
    res.json({ success: false, message: error.message });
  }
}

module.exports = { getImages };
