import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { success, fail } from '../helpers/responses';
import { renewJwt } from '../middleware/jwtAuth';

const registerUser = async (req) => {
  const newUser = new User({
    phone: req.phone,
    name: req.name,
    password: req.password,
  });
  await newUser.save();

  const authToken = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  return success([{ authToken, userId: newUser._id }]);
};

const loginUser = async (req) => {
  const user = await User.findOne({ phone: req.phone }).select(['password', '_id']);
  if (!user) return fail(['auth failed']);

  const compared = await compare(req.password, user.password);
  if (!compared) return fail(['auth failed']);

  const authToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  return success([{ authToken, userId: user._id }]);
};

const renewToken = async token => success([{ authToken: renewJwt(token) }]);

const isPhoneDuplicate = async (phoneNumber) => {
  const phone = User.formatPhone(phoneNumber);
  if (phone.length !== 11) throw Error('phone number not valid');

  const user = await User.findOne({ phone });
  return success([{ isDuplicate: Boolean(user) }]);
};

export {
  registerUser,
  loginUser,
  renewToken,
  isPhoneDuplicate,
};
