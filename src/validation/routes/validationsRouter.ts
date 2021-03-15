import { Router } from 'express';
import { FactoryFunction } from 'tsyringe';
import { ValidationsController } from '../controllers/validationsController';

const validationsRouterFactory: FactoryFunction<Router> = (dependencyContainer) => {
  const router = Router();
  const controller = dependencyContainer.resolve(ValidationsController);

  router.post('/', controller.post);

  return router;
};

export { validationsRouterFactory };
