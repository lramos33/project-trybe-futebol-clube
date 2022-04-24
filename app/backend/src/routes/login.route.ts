import * as express from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../middlewares/loginValidation.middleware';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  LoginValidation.emailValidation,
  LoginValidation.passwordValidation,
  LoginValidation.userValidation,
  LoginController.postLogin,
);

export default loginRouter;
