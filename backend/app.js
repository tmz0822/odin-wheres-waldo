const express = require('express');
const cors = require('cors');

const app = express();

const gameRouter = require('./routes/gameRouter');
const targetsRouter = require('./routes/targetsRouter');
const imagesRouter = require('./routes/imagesRouter');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/game', gameRouter);
app.use('/targets', targetsRouter);
app.use('/images', imagesRouter);

app.listen(3000, () => {
  'app listening on port 3000';
});
