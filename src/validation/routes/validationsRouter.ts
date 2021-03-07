import { Router } from 'express';
import { FactoryFunction } from 'tsyringe';
import { ValidationsController } from '../controllers/validationsController';

const validationsRouterFactory: FactoryFunction<Router> = (dependencyContainer) => {
  const router = Router();
  const controller = dependencyContainer.resolve(ValidationsController);

  router.get('/:flowId', controller.getValidation);

  return router;
};

export { validationsRouterFactory };
