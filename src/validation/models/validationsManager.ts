import { inject, injectable } from 'tsyringe';
import { Services } from '../../common/constants';
import { ILogger } from '../../common/interfaces';
import { Validation } from './validation';

@injectable()
export class ValidationsManager {
  public constructor(@inject(Services.LOGGER) private readonly logger: ILogger) {}

  public async getValidation(flowId: string): Promise<Validation | undefined> {
    this.logger.log('info', `Get validations for flow id ${flowId}`);
    return Math.random() < 0.5 ? { status: 'valid' } : { status: 'invalid' };
  }
}
