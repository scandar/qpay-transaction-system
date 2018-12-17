import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcrypt';
import validate from './validate';
import UserBalance, { userBalanceSchema } from '../UserBalance';

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: {
    type: String,
    validate: [{ validator: validate.name, msg: 'name length must be between 3 and 20 characters' }],
  },
  phone: {
    type: String,
    unique: true,
    validate: [{ validator: validate.phone, msg: 'invalid phone number' }],
  },
  password: {
    type: String,
    select: false,
    validate: [{ validator: validate.password, msg: 'password length must be between 6 and 25 characters' }],
  },
  balance: { type: userBalanceSchema, default: new UserBalance() },
}, { timestamps: true });

userSchema.pre('save', async function bcrypt(next) {
  if (this.password) {
    this.password = await hash(this.password, 10);
  }
  next();
});

userSchema.pre('validate', async function formatPhone(next) {
  if (this.phone.length > 11 && this.phone.indexOf('002') === 0) this.phone = this.phone.replace('002', '');
  if (this.phone.length > 11 && this.phone.indexOf('+2') === 0) this.phone = this.phone.replace('+2', '');
  if (this.phone.length === 10 && this.phone.indexOf('0') !== 0) this.phone = `${0}${this.phone}`;
  next();
});

userSchema.statics.formatPhone = (phoneNumber) => {
  let number = phoneNumber;

  if (number.length > 11 && number.indexOf('002') === 0) number = number.replace('002', '');
  if (number.length > 11 && number.indexOf('+2') === 0) number = number.replace('+2', '');
  if (number.length === 10 && number.indexOf('0') !== 0) number = `${0}${number}`;
  return number;
};

const User = mongoose.model('User', userSchema);
export default User;
