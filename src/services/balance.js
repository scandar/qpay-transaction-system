import { Types } from 'mongoose';
import User from '../models/User';
import { success, fail } from '../helpers/responses';


const getUserBalance = async (userId) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) });
  if (!user) return fail(['user not found']);
  return success([{ amount: parseFloat(user.balance.amount).toFixed(2) }]);
};

// eslint-disable-next-line import/prefer-default-export
export { getUserBalance };
