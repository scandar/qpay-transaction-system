import sanitize from '../middleware/sanitize';
import jwtAuth from '../middleware/jwtAuth';
import {
  registerUser,
  loginUser,
  renewToken,
  isPhoneDuplicate,
  getUserBalance,
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

  Router.route('/balance')
    .all(jwtAuth)
    .get(controllerHandler(getUserBalance, req => [req]));

  return Router;
};

module.exports = router;
