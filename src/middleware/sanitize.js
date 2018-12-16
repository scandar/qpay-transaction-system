import { escape } from 'validator';

export default (req, res, next) => {
  req.body = Object.keys(req.body).map(key => escape(req.body[key]));
  next();
};
