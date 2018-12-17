import mongoose, { Schema } from 'mongoose';
import validate from './validate';

export const userBalanceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  amount: {
    type: Schema.Types.Decimal128,
    default: 0,
    validate: [{ validator: validate.amount }],
  },
}, { timestamps: true });

const UserBalance = mongoose.model('UserBalance', userBalanceSchema);

export default UserBalance;
