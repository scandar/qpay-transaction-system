import bodyParser from 'body-parser';

const setMiddlewares = (app) => {
  // setup body parser to parse JSON requests
  app.use(bodyParser.json());
};

export default setMiddlewares;
