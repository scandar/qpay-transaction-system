import { Types } from 'mongoose';
import User from '../models/User';
import TransactionHistory from '../models/TransactionHistory';
import { success, fail } from '../helpers/responses';


const getUserBalance = async (userId) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) });
  if (!user) return fail(['user not found']);
  return success([{ amount: parseFloat(user.balance.amount).toFixed(2) }]);
};

const sendBalance = async (req) => {
  const sender = await User.findOne({ _id: new Types.ObjectId(req.senderId) }).select('balance _id');
  const receiver = await User.findOne({ _id: new Types.ObjectId(req.receiverId) }).select('balance _id');
  if (!sender || !receiver) return fail(['something went wrong']);

  // check if the amount is valid
  const senderBalance = parseFloat(sender.balance.amount);
  const receiverBalance = parseFloat(receiver.balance.amount);
  if ((senderBalance - req.amount) < 0) return fail(["you don't have enough balance to complete the transaction"]);

  sender.balance.amount = senderBalance - req.amount;
  receiver.balance.amount = receiverBalance + req.amount;

  const history = new TransactionHistory({
    sender: sender._id,
    receiver: receiver._id,
    amount: req.amount,
  });

  await sender.save();
  await receiver.save();
  await history.save();

  return success([{ currentBalance: parseFloat(sender.balance.amount).toFixed(2) }]);
};

export { getUserBalance, sendBalance };
