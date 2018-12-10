import debug from 'debug';

const log = debug('app:routes:controllerHandler');

/**
 * Handles controller execution and responds to user (API Express version).
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise. I.e. getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || {
      status: { code: 200, message: 'success' },
      data: [],
    });
  } catch (error) {
    log(error);
    return res.status(400).json({
      status: { code: 400, message: 'something went wrong' },
      errors: [error.message],
    });
  }
};

export default controllerHandler;
