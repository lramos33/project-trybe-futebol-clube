import CreateMatchBody from '../interfaces/createMatchBody';
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

  static getByQuery = async (query: string) => {
    const inProgress = query === 'true' ? 1 : 0;
    return Matches.findAll({
      where: { inProgress },
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
    });
  };

  static createMatch = async (requestBody: CreateMatchBody) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = requestBody;
    return Matches.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
  };
}

export default MatchesService;
