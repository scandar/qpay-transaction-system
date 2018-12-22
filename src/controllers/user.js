import {
  registerUser as registerUserService,
  loginUser as loginUserService,
  renewToken as renewTokenService,
  isPhoneDuplicate as isPhoneDuplicateService,
} from '../services/user';

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
  registerUser,
  loginUser,
  renewToken,
  isPhoneDuplicate,
};
