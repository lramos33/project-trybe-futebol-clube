import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

class Token {
  static generateToken = (data: { email: string, password: string }): string => {
    const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
    return jwt.sign(data, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' });
  };

  static validateToken = () => {};
}

export default Token;
