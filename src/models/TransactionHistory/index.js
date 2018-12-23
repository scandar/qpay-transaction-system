import mongoose, { Schema } from 'mongoose';
import validate from './validate';

const historySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  sender: { type: Schema.Types.ObjectId },
  receiver: { type: Schema.Types.ObjectId },
  amount: { type: Schema.Types.Decimal128, validate: [{ validator: validate.amount }] },
}, { timestamps: true });

historySchema.pre('save', function setId() {
  this._id = new mongoose.Types.ObjectId();
});

const TransactionHistory = mongoose.model('TransactionHistory', historySchema);
export default TransactionHistory;
