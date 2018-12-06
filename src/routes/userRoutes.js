import { getUser } from '../controllers/user';

const router = (Router, controllerHandler) => {
  Router.route('/:username')
    .get(controllerHandler(getUser, req => [req.params.username]));

  return Router;
};

module.exports = router;
