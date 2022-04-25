import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = express.Router();

matchesRouter.get(
  '/',
  MatchesController.getAll,
);

// matchesRouter.post(
//   '/',
// );

// matchesRouter.patch(
//   '/:id',
// );

// matchesRouter.patch(
//   '/:id/finish',
// );

export default matchesRouter;
