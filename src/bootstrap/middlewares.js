import bodyParser from 'body-parser';
import helmet from 'helmet';

const setMiddlewares = (app) => {
  // setup helmet to secure http headers
  app.use(helmet({ permittedCrossDomainPolicies: true }));

  // setup body parser to parse JSON requests
  app.use(bodyParser.json());
};

export default setMiddlewares;
