import mongoose, { Schema } from 'mongoose';
import { hash } from 'bcrypt';
import validate from './validate';

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
    validate: [{ validator: validate.password, msg: 'password length must be between 6 and 25 characters' }],
  },
}, { timestamps: true });

userSchema.pre('save', async function bcrypt(next) {
  this.password = await hash(this.password, 10);
  next();
});

userSchema.pre('validate', async function formatPhone(next) {
  if (this.phone.length > 11 && this.phone.indexOf('002') === 0) this.phone = this.phone.replace('002', '');
  if (this.phone.length > 11 && this.phone.indexOf('+2') === 0) this.phone = this.phone.replace('+2', '');
  if (this.phone.length === 10 && this.phone.indexOf('0') !== 0) this.phone = `${0}${this.phone}`;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
