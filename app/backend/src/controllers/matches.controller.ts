import { Request, Response, NextFunction } from 'express';
import Matches from '../services/matches.service';

class MatchesController {
  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Matches.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
