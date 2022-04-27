import { Request, Response, NextFunction } from 'express';
import Matches from '../services/matches.service';

const UNAUTHORIZED_ERROR_MESSAGE = 'It is not possible to create a match with two equal teams'; // status code: 401
const NOT_FOUND_ERROR_MESSAGE = 'There is no team with such id!'; // status code: 404
const EDITED_MATCH_GOALS_MESSAGE = 'Updated goals'; // status code: 200
const EDITED_MATCH_PROGRESS_MESSAGE = 'Updated progress'; // status code: 200

class MatchesController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        return res.status(200).json(await Matches.getByQuery(inProgress as string));
      }
      return res.status(200).json(await Matches.getAll());
    } catch (error) {
      next(error);
    }
  };

  static createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeam, awayTeam } = req.body;
      const verifyHomeTeam = await Matches.verifyTeam(homeTeam);
      const verifyAwayTeam = await Matches.verifyTeam(awayTeam);

      if (homeTeam === awayTeam) {
        return res.status(401).json({ message: UNAUTHORIZED_ERROR_MESSAGE });
      }

      if (verifyAwayTeam === null || verifyHomeTeam === null) {
        return res.status(404).json({ message: NOT_FOUND_ERROR_MESSAGE });
      }

      return res.status(201).json(await Matches.createMatch(req.body));
    } catch (error) {
      next(error);
    }
  };

  static editMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;
      await Matches.editMatch({ id, homeTeamGoals, awayTeamGoals });
      return res.status(200).json({ message: EDITED_MATCH_GOALS_MESSAGE });
    } catch (error) {
      next(error);
    }
  };

  static finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await Matches.finishMatch(id);
      return res.status(200).json({ message: EDITED_MATCH_PROGRESS_MESSAGE });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
