import * as express from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../middlewares/loginValidation.middleware';
import ValidateJWT from '../middlewares/validateJWT.middleware';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  LoginValidation.emailValidation,
  LoginValidation.passwordValidation,
  LoginValidation.userValidation,
  LoginController.postLogin,
);

loginRouter.get(
  '/validate',
  ValidateJWT.validateToken,
  LoginController.getLogin,
);

export default loginRouter;
