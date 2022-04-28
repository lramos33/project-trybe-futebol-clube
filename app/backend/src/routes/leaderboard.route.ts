import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();

// leaderboardRouter.get(
//   '/',
// );

leaderboardRouter.get(
  '/home',
  LeaderboardController.getHomeLeaderboard,
);

leaderboardRouter.get(
  '/away',
  LeaderboardController.getAwayLeaderboard,
);

export default leaderboardRouter;
