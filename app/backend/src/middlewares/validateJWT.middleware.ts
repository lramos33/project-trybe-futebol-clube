import { Request, Response, NextFunction } from 'express';
import Token from '../services/token.service';

const UNAUTHORIZED_ERROR_MESSAGE = 'Token not found'; // status code: 401

class ValidateJWT {
  static validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: UNAUTHORIZED_ERROR_MESSAGE });
    }

    try {
      const userData = await Token.approvedToken(token);
      req.body.user = userData;

      next();
    } catch (error) {
      return res.status(401).json({ message: UNAUTHORIZED_ERROR_MESSAGE });
    }
  };
}

export default ValidateJWT;
