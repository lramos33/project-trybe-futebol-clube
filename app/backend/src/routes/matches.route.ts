import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import ValidateJWT from '../middlewares/validateJWT.middleware';

const matchesRouter = express.Router();

matchesRouter.get(
  '/',
  MatchesController.getAll,
);

matchesRouter.post(
  '/',
  ValidateJWT.validateToken,
  MatchesController.createMatch,
);

// matchesRouter.patch(
//   '/:id',
// );

// matchesRouter.patch(
//   '/:id/finish',
// );

export default matchesRouter;
