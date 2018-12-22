import { Router } from 'express';
import controllerHandler from './controllerHandler';
import userRoutes from './userRoutes';
import balanceRoutes from './balanceRoutes';


const routes = (app) => {
  const userRouter = userRoutes(Router(), controllerHandler);
  const balanceRouter = balanceRoutes(Router(), controllerHandler);

  app.use('/users', userRouter);
  app.use('/balance', balanceRouter);
};

export default routes;
