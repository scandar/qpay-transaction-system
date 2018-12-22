import sanitize from '../middleware/sanitize';
import jwtAuth from '../middleware/jwtAuth';
import { getUserBalance, sendBalance } from '../controllers/balance';

const router = (Router, controllerHandler) => {
  // middleware to sanitize user input
  Router.use(sanitize);

  Router.route('/')
    .all(jwtAuth)
    .get(controllerHandler(getUserBalance, req => [req]));

  Router.route('/send')
    .all(jwtAuth)
    .post(controllerHandler(sendBalance, req => [req]));

  return Router;
};

module.exports = router;
