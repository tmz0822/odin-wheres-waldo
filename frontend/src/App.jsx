import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router';

function App() {
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
        <div key={image.id}>
          <Link to={`/game/${image.id}`}>Game</Link>
        </div>
      ))}
    </>
  );
}

export default App;

