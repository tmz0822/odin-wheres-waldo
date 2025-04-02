import { useEffect, useState } from 'react';
import Image from './components/Game';
import './App.css';
import axios from 'axios';
import Marker from './components/Marker';
import Game from './components/Game';

function App() {
  // Maybe fetch images?
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const response = await axios.get('http://localhost:3000/images');

      if (response.data.success) {
        setImages(response.data.images);
      }
    }

    fetchImages();
  }, []);

  if (images.length === 0) {
    return <p>No image found!</p>;
  }

  return (
    <>
      {images.map((image) => (
        <Game key={image.id} image={image} />
      ))}
    </>
  );
}

export default App;

