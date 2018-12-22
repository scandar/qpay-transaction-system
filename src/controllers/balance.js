import SendBalanceRequest from '../requests/SendBalance';
import {
  getUserBalance as getUserBalanceService,
  sendBalance as sendBalanceService,
} from '../services/balance';

const getUserBalance = async (req) => {
  const response = await getUserBalanceService(req.userId);
  return response;
};

const sendBalance = async (req) => {
  const request = new SendBalanceRequest({
    senderId: req.userId,
    receiverId: req.body.receiverId,
    amount: req.body.amount,
  });

  const response = await sendBalanceService(request);
  return response;
};

export { getUserBalance, sendBalance };
