import { RequestHandler } from 'express';
import httpStatus from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Validation } from '../models/validation';
import { ValidationsManager } from '../models/validationsManager';

interface ValidationPayload {
  path: string;
}

type CreateRequestHandler = RequestHandler<undefined, Validation, ValidationPayload>;

@injectable()
export class ValidationsController {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger, private readonly manager: ValidationsManager) {}

  public post: CreateRequestHandler = async (req, res, next) => {
    try {
      const { path } = req.body;
      const validation = await this.manager.validate(path);
      if (!validation) {
        const error = new Error('Path was not found.');
        return next(error);
      }
      return res.status(httpStatus.CREATED).json(validation);
    } catch (error) {
      return next(error);
    }
  };
}
