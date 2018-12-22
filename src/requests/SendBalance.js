import { isMongoId, isFloat } from 'validator';

export default ({ senderId, receiverId, amount }) => {
  if (!isMongoId(senderId) || !isMongoId(receiverId)) throw new Error('wrong sender or receiver id');
  if (!isFloat(amount, { min: 1, max: 10000 })) throw new Error('amount must be between 1 and 10k');

  return { senderId, receiverId, amount: parseFloat(amount) };
};
