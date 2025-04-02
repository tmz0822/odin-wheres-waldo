const targetsQueries = require('../db/targetsQueries');

async function verifyTargets(req, res) {
  const imageId = req.params.imageId;
  const { targetIndex, coordinates } = req.body;

  const target = await targetsQueries.getTarget(imageId, targetIndex);
  console.log(coordinates);
  console.log(target);
  // Verify coordinates
  const acceptableOffset = 40;

  if (
    isWithinTarget(
      coordinates.x,
      coordinates.y,
      target.x,
      target.y,
      acceptableOffset
    )
  ) {
    res.json({ found: true, target });
  } else {
    res.json({ found: false });
  }
}

const isWithinTarget = (clickX, clickY, targetX, targetY, offset = 80) => {
  const distance = Math.sqrt((clickX - targetX) ** 2 + (clickY - targetY) ** 2);
  console.log(distance);
  return distance <= offset;
};

module.exports = { verifyTargets };
