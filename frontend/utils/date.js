// Convert time (in milliseconds) to MM:SS:MS format
const formatTime = (timeInMillis) => {
  const minutes = Math.floor(timeInMillis / 60000); // 60,000 ms = 1 minute
  const seconds = Math.floor((timeInMillis % 60000) / 1000); // Remainder after minutes, in seconds
  const milliseconds = timeInMillis % 1000; // Remainder in milliseconds

  // Pad with leading zeros if necessary (e.g., "05" instead of "5")
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
};

export { formatTime };
