import dotenv from 'dotenv';
import setMiddlewares from './middlewares';
import connection from './connection';
import server from './server';
import routes from '../routes';

const bootstrap = (app) => {
  // Sets environment variables
  dotenv.config();

  // Starts Database connection
  connection();

  // Set Middlewares
  setMiddlewares(app);

  // Set Routes
  routes(app);

  // Start Server
  server(app);
};

export default bootstrap;
