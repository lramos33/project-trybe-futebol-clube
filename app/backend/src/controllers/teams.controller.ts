import { Request, Response, NextFunction } from 'express';
import Teams from '../services/teams.service';

const NOT_FOUND_ERROR_MESSAGE = 'Team does not exist'; // status code: 404

class TeamsController {
  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await Teams.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await Teams.getById(id);

      if (!result) {
        return res.status(404).json({ message: NOT_FOUND_ERROR_MESSAGE });
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
