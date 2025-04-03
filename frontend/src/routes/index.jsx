import { createBrowserRouter } from 'react-router';
import App from '../App';
import Game from '../pages/Game';
import Leaderboard from '../pages/Leaderboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/game',
    children: [
      {
        path: ':imageId',
        element: <Game />,
      },
      {
        path: ':imageId/leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
]);

export default router;
