import { Request, Response, NextFunction } from 'express';
import HomeLeaderboard from '../services/homeLeaderboard.service';
import AwayLeaderboard from '../services/awayLeaderboard.service';

class LeaderboardController {
  static getHomeLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await HomeLeaderboard.returnResponse();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getAwayLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AwayLeaderboard.returnResponse();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
