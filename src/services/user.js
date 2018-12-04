import User from '../models/User';

// Just as a mongoose
// reminder, .exec() on find
// returns a Promise instead
// of the default callback.
export const getUser = username => User.find({ username }).exec();

export const isChucknorris = username => username === 'Chuck Norris';
