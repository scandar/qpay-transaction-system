import { compare } from 'bcrypt';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { renewJwt } from '../middleware/jwtAuth';

// Just as a mongoose
// reminder, .exec() on find
// returns a Promise instead
// of the default callback.
export const getUser = username => User.find({ username }).exec();

export const registerUser = async (req) => {
  const newUser = new User({
    phone: req.phone,
    name: req.name,
    password: req.password,
  });

  await newUser.save();

  const authToken = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY, { expiresIn: '1h' });

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [{ authToken }],
  };
};

export const loginUser = async (req) => {
  const user = await User.findOne({ phone: req.phone }).select(['password', '_id']);
  const compared = await compare(req.password, user.password);

  if (!user || !compared) {
    return {
      status: {
        code: 400,
        message: 'auth failed',
      },
      errors: ['auth failed'],
    };
  }

  const authToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [{ authToken }],
  };
};

export const renewToken = async (token) => {
  const authToken = renewJwt(token);

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [{ authToken }],
  };
};

export const isPhoneDuplicate = async (phoneNumber) => {
  const phone = User.formatPhone(phoneNumber);

  if (phone.length !== 11) throw Error('phone number not valid');

  const user = await User.findOne({ phone });

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [{ isDuplicate: Boolean(user) }],
  };
};

export const getUserBalance = async (userId) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) });

  if (!user) {
    return {
      status: {
        code: 400,
        message: 'failed',
      },
      errors: ['user not found'],
    };
  }

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [{ amount: parseFloat(user.balance.amount).toFixed(2) }],
  };
};

export const isChucknorris = username => username === 'Chuck Norris';
