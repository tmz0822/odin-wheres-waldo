const isWithinTarget = (clickX, clickY, targetX, targetY, offset = 80) => {
  const distance = Math.sqrt((clickX - targetX) ** 2 + (clickY - targetY) ** 2);
  console.log(distance);
  return distance <= offset;
};

console.log(isWithinTarget(456, 453, 517, 450, 40));
