import * as bcryptjs from 'bcryptjs';
import Users from '../database/models/Users';
import Token from './token.service';

const BAD_REQUEST_ERROR_MESSAGE = 'All fields must be filled'; // status code: 400
const UNAUTHORIZED_ERROR_MESSAGE = 'Incorrect email or password'; // status code: 401

const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;

class Validations {
  static emailValidation = (email: string) => {
    if (email === '') {
      return { code: 400, message: BAD_REQUEST_ERROR_MESSAGE };
    }

    if (!email.match(EMAIL_REGEX)) {
      return { code: 401, message: UNAUTHORIZED_ERROR_MESSAGE };
    }
  };

  static passwordValidation = (password: string) => {
    if (password === '') {
      return { code: 400, message: BAD_REQUEST_ERROR_MESSAGE };
    }

    if (password.length <= 6) {
      return { code: 401, message: UNAUTHORIZED_ERROR_MESSAGE };
    }
  };

  static userValidation = async (email: string, password: string) => {
    const userData = await Users.findOne({ where: { email } });

    if (!userData) {
      return { code: 401, message: UNAUTHORIZED_ERROR_MESSAGE };
    }

    if (!bcryptjs.compareSync(password, userData.password)) {
      return { code: 401, message: UNAUTHORIZED_ERROR_MESSAGE };
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
