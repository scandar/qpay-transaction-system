import { getUser, registerUser } from '../controllers/user';

const router = (Router, controllerHandler) => {
  Router.route('/:username')
    .get(controllerHandler(getUser, req => [req.params.username]));

  Router.route('/')
    .post(controllerHandler(registerUser, req => [req.body.user]));

  return Router;
};

module.exports = router;
