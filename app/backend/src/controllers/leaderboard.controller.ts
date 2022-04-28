import { Request, Response, NextFunction } from 'express';
import Leaderboard from '../services/leaderboard.service';

class LeaderboardController {
  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Leaderboard.returnResponse();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderboardController;
