import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/Users';
import Token from './token.service';

class Validations {
  static emailValidation = (email: string) => {
    const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;

    if (email === '') {
      return { code: 400, message: 'All fields must be filled' };
    }

    if (!email.match(EMAIL_REGEX)) {
      return { code: 401, message: 'Incorrect email or password' };
    }
  };

  static passwordValidation = (password: string) => {
    if (password === '') {
      return { code: 400, message: 'All fields must be filled' };
    }

    if (password.length <= 6) {
      return { code: 401, message: 'Incorrect email or password' };
    }
  };

  static userValidation = async (email: string, password: string) => {
    const userData = await Users.findOne({ where: { email } });

    if (!userData) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    if (!bcryptjs.compareSync(password, userData.password)) {
      return { code: 401, message: 'Incorrect email or password' };
    }
  };

  static approvedValidation = async (email: string, password: string) => {
    const userData = await Users.findOne({ where: { email } });
    const token = Token.generateToken({ email, password });
    return {
      user: {
        id: userData?.id,
        username: userData?.username,
        role: userData?.role,
        email,
      },
      token,
    };
  };
}

export default Validations;
