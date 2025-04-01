import { useState } from 'react';
import './App.css';
import imageUrl from './images/waldo2.jpg';
import ClickBox from './components/ClickBox';
import DropdownMenu from './components/DropdownMenu';

function App() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [clickBoxIsVisible, setClickBoxIsVisible] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  function handleClick(e) {}

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

  console.log(`Coordinates, ${coordinates.x}, ${coordinates.y}`);

  return (
    <div className="image-container">
      <img
        src={imageUrl}
        alt=""
        onClick={handleClick}
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

      <DropdownMenu
        x={coordinates.x}
        y={coordinates.y}
        isVisible={menuIsVisible}
        baseFileName="waldo2"
      />
    </div>
  );
}

export default App;

