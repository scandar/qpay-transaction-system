import controllerHandler from './controllerHandler';
import userRoutes from './userRoutes';


const routes = (app, Router) => {
  const userRouter = userRoutes(Router, controllerHandler);
  app.use('/users', userRouter);
};

export default routes;
