import {
  getUserBalance as getUserBalanceService,
} from '../services/balance';

const getUserBalance = async (req) => {
  const response = await getUserBalanceService(req.userId);
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { getUserBalance };
