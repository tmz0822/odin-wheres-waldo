import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Leaderboard = () => {
  const { imageId } = useParams();

  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    async function fetchHighScores() {
      const response = await axios.get(`http://localhost:3000/game/${imageId}`);

      if (response.data.success) {
        console.log(response.data);
        setHighScores(response.data.highScores);
      }
    }

    fetchHighScores();
  }, [imageId]);

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th>High score</th>
          </tr>
        </thead>

        <tbody>
          {highScores.map((score, index) => (
            <tr key={score.id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.timeSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
