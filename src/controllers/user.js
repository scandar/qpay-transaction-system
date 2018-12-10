import { getUser as getUserService, registerUser as registerUserService } from '../services/user';

/**
 * Get a user by username.
 * @param username a string value that represents user's username.
 * @returns A Promise, an exception or a value.
 */
export const getUser = async (username) => {
  if (username === '') {
    throw new Error('Username can\'t be blank');
  }

  const user = await getUserService(username);
  return user;
};

export const registerUser = async (user) => {
  const response = await registerUserService(user);
  return response;
};

export const extraFunction = () => {

};
