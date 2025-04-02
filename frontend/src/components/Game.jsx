import { useEffect, useState } from 'react';
import imageUrl from '../images/waldo2.jpg';
import ClickBox from './ClickBox';
import DropdownMenu from './DropdownMenu';
import Marker from './Marker';
import axios from 'axios';

// When this element shows
// Start the 'game session' and timer.
const Game = ({ image }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [clickBoxIsVisible, setClickBoxIsVisible] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [markers, setMarkers] = useState([]);

  const [gameSession, setGameSession] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    // Start a game session
    async function startGameSession() {
      console.log(gameSession);
      if (gameSession) return;

      const response = await axios.post(
        `http://localhost:3000/game/${image.id}/start`
      );

      if (response.data.success) {
        setGameSession(response.data.gameSession);
      }
    }

    startGameSession();

    // Check if game finishes
    if (gameSession !== null && gameSession.found === image.targets.length) {
      console.log('ending game');
      endGameSession();
    }

    async function endGameSession() {
      const response = await axios.put(
        `http://localhost:3000/game/${gameSession.id}/end`
      );
      console.log(response);
      if (response.data.success) {
        // setGameSession(response.data.updatedSession);
        setIsRunning(false);
        setGameSession(null);
      }
    }

    const interval = setInterval(() => {
      if (isRunning) {
        setTime((prevTime) => prevTime + 10);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning, gameSession, image.id, image.targets.length]);

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

  function handleMouseDown(e) {
    updateCoordinates(e);
    setClickBoxIsVisible(true);
    setMenuIsVisible(!menuIsVisible);
  }

  function handleMouseUp(e) {
    setClickBoxIsVisible(false);
  }

  function updateCoordinates(e) {
    const image = e.target;
    const rect = image.getBoundingClientRect();

    // Get mouse click relative to the image on screen
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoordinates({ x, y });
  }

  function handleAddMarker(target) {
    setMarkers((prevMarkers) => [...prevMarkers, target]);
    setMenuIsVisible(false);
  }

  async function handleTargetFound() {
    const response = await axios.put(
      `http://localhost:3000/game/${gameSession.id}/found`
    );

    if (response.data.success) {
      setGameSession(response.data.updatedSession);
    }
  }

  return (
    <>
      <h1>{image.name}</h1>
      <h2>Time: {formatTime(time)}</h2>
      <div className="image-container">
        <img
          src={imageUrl}
          alt=""
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          draggable="false"
        />

        {clickBoxIsVisible && (
          <ClickBox
            x={coordinates.x}
            y={coordinates.y}
            isVisible={clickBoxIsVisible}
          />
        )}

        {menuIsVisible && (
          <DropdownMenu
            x={coordinates.x}
            y={coordinates.y}
            isVisible={menuIsVisible}
            image={image}
            handleAddMarker={handleAddMarker}
            handleTargetFound={handleTargetFound}
          />
        )}

        {markers.map((marker) => (
          <Marker key={marker.id} marker={marker}>
            ✅
          </Marker>
        ))}
      </div>
    </>
  );
};

export default Game;
