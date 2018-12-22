import { escape } from 'validator';

export default (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = escape(`${req.body[key]}`);
  });

  next();
};
