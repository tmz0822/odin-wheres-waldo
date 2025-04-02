const { Router } = require('express');

const imagesRouter = Router();

const imagesController = require('../controllers/imagesController');

imagesRouter.get('/', imagesController.getImages);

module.exports = imagesRouter;
