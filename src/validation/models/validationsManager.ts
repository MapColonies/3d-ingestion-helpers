import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Validation } from './validation';

@injectable()
export class ValidationsManager {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async validate(path: string): Promise<Validation | undefined> {
    this.logger.log('info', `Validate 3d model in path: ${path}`);
    return Math.random() < 0.5 ? { validations: 'valid' } : { validations: 'invalid' };
  }
}
