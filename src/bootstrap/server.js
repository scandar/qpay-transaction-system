import debug from 'debug';

const log = debug('app:server');

const server = (app) => {
  app.listen(process.env.PORT, () => {
    log(`listening on port ${process.env.PORT}`);
  }).on('error', log);
};

export default server;
