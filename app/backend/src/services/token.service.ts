import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import Users from '../database/models/Users';

const JWT_SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

class Token {
  static generateToken = (data: { email: string, password: string }): string => (
    jwt.sign(data, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' })
  );

  static approvedToken = async (token: string) => {
    const verifiedUser = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return Users.findOne({ where: { email: verifiedUser.email } });
  };
}

export default Token;
