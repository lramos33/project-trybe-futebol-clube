import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

class MatchesService {
  static getAll = async () => (Matches.findAll({
    include: [
      {
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
  }));
}

export default MatchesService;
