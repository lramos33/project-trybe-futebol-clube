import { Request, Response, NextFunction } from 'express';
import Validation from '../services/validations.service';

class LoginValidation {
  static emailValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const emailError = Validation.emailValidation(email);

      if (emailError) {
        return res.status(emailError.code).json({ message: emailError.message });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  static passwordValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const passwordError = Validation.passwordValidation(password);

      if (passwordError) {
        return res.status(passwordError.code).json({ message: passwordError.message });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  static userValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userError = await Validation.userValidation(email, password);

      if (userError) {
        return res.status(userError.code).json({ message: userError.message });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default LoginValidation;
