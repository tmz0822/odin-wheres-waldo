import { useEffect, useState } from 'react';
import imageUrl from '../images/waldo2.jpg';
import ClickBox from '../components/ClickBox';
import DropdownMenu from '../components/DropdownMenu';
import Marker from '../components/Marker';
import axios from 'axios';
import { formatTime } from '../../utils/date';
import { Link, useParams } from 'react-router';

const Game = () => {
  const { imageId } = useParams();
  const [image, setImage] = useState(null);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [clickBoxIsVisible, setClickBoxIsVisible] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [gameSession, setGameSession] = useState(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    // fetch image
    fetchImage(imageId);

    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increase time every 10ms
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, imageId]);

  useEffect(() => {
    async function fetchHighScores() {
      const response = await axios.get(`http://localhost:3000/game/${imageId}`);

      if (response.data.success) {
        setHighScores(response.data.highScores);
      }
    }

    fetchHighScores();
  }, [imageId]);

  async function fetchImage(imageId) {
    const response = await axios.get(`http://localhost:3000/images/${imageId}`);
    console.log(response);
    if (response.data.success) {
      setImage(response.data.image);
    }
  }

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
      const updatedGameSession = response.data.gameSession;
      if (updatedGameSession.found === image.targets.length) {
        console.log('ending game session');
        endGameSession({ time });
        setGameSession(null);
        setIsRunning(false);
      } else {
        setGameSession(response.data.gameSession);
      }
    }
  }

  function startGame() {
    resetGame();
    createGameSession();
  }

  function resetGame() {
    setTime(0);
    setIsRunning(true);
    setMarkers([]);
  }

  async function createGameSession() {
    const response = await axios.post(
      `http://localhost:3000/game/${image.id}/create`
    );
    if (response.data.success) {
      setGameSession(response.data.gameSession);
    }
  }

  async function endGameSession() {
    // Compare the time with the current high scores
    const newHighScore = highScores.find(
      (highScore) => highScore.timeSpent > time
    );
    if (newHighScore) {
      const username = prompt(
        'You have made a new high score! Enter your username if you want to show it in the leaderboard!'
      );
      await axios.put(`http://localhost:3000/game/${gameSession.id}/end`, {
        time,
        username,
      });
    } else {
      await axios.put(`http://localhost:3000/game/${gameSession.id}/end`, {
        time,
      });
    }
  }

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="leaderboard">Leaderboard</Link>
      <button onClick={startGame} disabled={gameSession !== null}>
        Start Game
      </button>
      <h1>{image.name}</h1>
      <h2>Time: {formatTime(time)}</h2>
      <div className="image-container">
        <img
          src={imageUrl}
          alt=""
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          draggable="false"
          style={{
            pointerEvents: isRunning ? 'auto' : 'none',
          }}
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
