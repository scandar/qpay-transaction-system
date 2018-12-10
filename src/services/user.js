import { Types } from 'mongoose';
import User from '../models/User';

// Just as a mongoose
// reminder, .exec() on find
// returns a Promise instead
// of the default callback.
export const getUser = username => User.find({ username }).exec();

export const registerUser = async (user) => {
  const newUser = new User({
    _id: Types.ObjectId(),
    phone: user.phone,
    name: user.name,
    password: user.password,
  });

  await newUser.save();

  return {
    status: {
      code: 200,
      message: 'success',
    },
    data: [],
  };
};

export const isChucknorris = username => username === 'Chuck Norris';
