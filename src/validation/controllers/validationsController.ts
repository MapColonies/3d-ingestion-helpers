import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Validation } from '../models/validation';
import { ValidationsManager } from '../models/validationsManager';

interface ValidationParams {
  flowId: string;
}

type GetRequestHandler = RequestHandler<ValidationParams, Validation>;

@injectable()
export class ValidationsController {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger, private readonly manager: ValidationsManager) {}

  public getValidation: GetRequestHandler = async (req, res, next) => {
    try {
      const { flowId } = req.params;
      const validation = await this.manager.getValidation(flowId);
      if (!validation) {
        const error = new Error('Flow with given id was not found.');
        return next(error);
      }
      return res.status(httpStatus.OK).json(validation);
    } catch (error) {
      return next(error);
    }
  };
}
