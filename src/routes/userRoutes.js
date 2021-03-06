import sanitize from '../middleware/sanitize';
import {
  registerUser,
  loginUser,
  renewToken,
  isPhoneDuplicate,
} from '../controllers/user';

const router = (Router, controllerHandler) => {
  // middleware to sanitize user input
  Router.use(sanitize);

  Router.route('/register')
    .post(controllerHandler(registerUser, req => [req.body]));

  Router.route('/login')
    .post(controllerHandler(loginUser, req => [req.body]));

  Router.route('/token/renew')
    .get(controllerHandler(renewToken, req => [req.headers.authorization]));

  Router.route('/phone/:phoneNumber/duplicate')
    .get(controllerHandler(isPhoneDuplicate, req => [req.params.phoneNumber]));

  return Router;
};

module.exports = router;
