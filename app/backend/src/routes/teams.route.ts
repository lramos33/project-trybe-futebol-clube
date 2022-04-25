import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRouter = express.Router();

teamsRouter.get(
  '/',
  TeamsController.getAll,
);

teamsRouter.get(
  '/:id',
  TeamsController.getById,
);

export default teamsRouter;
