import { getUser as getUserService } from '../services/user';

/**
 * Get a user by username.
 * @param username a string value that represents user's username.
 * @returns A Promise, an exception or a value.
 */
export async function getUser(username) {
  if (username === '') {
    throw new Error('Username can\'t be blank');
  }

  const user = await getUserService(username);
  return user;
}

export function extraFunction() {

}
