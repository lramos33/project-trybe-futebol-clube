import { Op } from 'sequelize';
import Match from '../interfaces/match';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import Leaderboard from '../interfaces/leaderboard';

class GeneralLeaderboardService {
  static getMatchesByHomeId = async (id: number) => (
    Matches.findAll({ where: {
      [Op.or]: [{ homeTeam: id }, { awayTeam: id }],
      inProgress: false,
    } })
  );

  static setTotalPoints = (victories: number, draws: number) => (victories * 3) + draws;

  static setTotalGames = (matches: Match[]) => matches.length;

  static setGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

  static setEfficiency = (totalPoints: number, totalGames: number) => (
    +((totalPoints / (totalGames * 3)) * 100).toFixed(2)
  );

  static setTotalVictories = (matches: Match[], id: number) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.homeTeam === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          count += 1;
        }
        /* eslint-disable-next-line */
      } else if (match.awayTeam === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          count += 1;
        }
      }
    });

    return count;
  };

  static setTotalDraws = (matches: Match[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  static setTotalLosses = (matches: Match[], id: number) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.homeTeam === id) {
        if (match.homeTeamGoals < match.awayTeamGoals) {
          count += 1;
        }
        /* eslint-disable-next-line */
      } else if (match.awayTeam === id) {
        if (match.awayTeamGoals < match.homeTeamGoals) {
          count += 1;
        }
      }
    });

    return count;
  };

  static setGoalsFavor = (matches: Match[], id: number) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.homeTeam === id) {
        count += match.homeTeamGoals;
      } else {
        count += match.awayTeamGoals;
      }
    });

    return count;
  };

  static setGoalsOwn = (matches: Match[], id: number) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.homeTeam === id) {
        count += match.awayTeamGoals;
      } else {
        count += match.homeTeamGoals;
      }
    });

    return count;
  };

  static sortResponse = (leaderboard: Leaderboard[]) => (
    leaderboard.sort((teamA, teamB) => {
      // Decreasing
      if (teamA.totalPoints < teamB.totalPoints) return 1;
      if (teamA.totalPoints > teamB.totalPoints) return -1;

      // Decreasing
      if (teamA.goalsBalance < teamB.goalsBalance) return 1;
      if (teamA.goalsBalance > teamB.goalsBalance) return -1;

      // Decreasing
      if (teamA.goalsFavor < teamB.goalsFavor) return 1;
      if (teamA.goalsFavor > teamB.goalsFavor) return -1;

      // Increasing
      if (teamA.goalsOwn < teamB.goalsOwn) return -1;
      if (teamA.goalsOwn > teamB.goalsOwn) return 1;

      return 0;
    })
  );

  /* eslint-disable-next-line */
  static buildResponse = (matches: Match[], id: number) => {
    const totalGames = this.setTotalGames(matches);
    const totalVictories = this.setTotalVictories(matches, id);
    const totalDraws = this.setTotalDraws(matches);
    const totalLosses = this.setTotalLosses(matches, id);
    const goalsFavor = this.setGoalsFavor(matches, id);
    const goalsOwn = this.setGoalsOwn(matches, id);
    const totalPoints = this.setTotalPoints(totalVictories, totalDraws);
    const goalsBalance = this.setGoalsBalance(goalsFavor, goalsOwn);
    const efficiency = this.setEfficiency(totalPoints, totalGames);

    return {
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  };

  static returnResponse = async () => {
    const teams = await Teams.findAll();

    const leaderboard = await Promise.all(
      teams.map(async ({ id, teamName }) => {
        const matches = await this.getMatchesByHomeId(id);
        const response = this.buildResponse(matches, id);
        return {
          name: teamName,
          ...response,
        };
      }),
    );

    this.sortResponse(leaderboard);

    return leaderboard;
  };
}

export default GeneralLeaderboardService;
