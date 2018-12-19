import {
  getUser as getUserService,
  registerUser as registerUserService,
  loginUser as loginUserService,
  renewToken as renewTokenService,
  isPhoneDuplicate as isPhoneDuplicateService,
} from '../services/user';

/**
 * Get a user by username.
 * @param username a string value that represents user's username.
 * @returns A Promise, an exception or a value.
 */
const getUser = async (username) => {
  if (username === '') {
    throw new Error('Username can\'t be blank');
  }

  const user = await getUserService(username);
  return user;
};

const registerUser = async (req) => {
  const response = await registerUserService(req);
  return response;
};

const loginUser = async (req) => {
  const response = await loginUserService(req);
  return response;
};

const renewToken = async (token) => {
  const response = await renewTokenService(token);
  return response;
};

const isPhoneDuplicate = async (phoneNumber) => {
  const response = await isPhoneDuplicateService(phoneNumber);
  return response;
};

export {
  getUser,
  registerUser,
  loginUser,
  renewToken,
  isPhoneDuplicate,
};
