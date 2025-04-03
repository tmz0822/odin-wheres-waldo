const { Router } = require('express');

const imagesRouter = Router();

const imagesController = require('../controllers/imagesController');

imagesRouter.get('/', imagesController.getImages);

imagesRouter.get('/:imageId', imagesController.getImageById);

module.exports = imagesRouter;
