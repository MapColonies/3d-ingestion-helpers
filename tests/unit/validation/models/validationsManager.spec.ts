import faker from 'faker';
import { ValidationsManager } from '../../../../src/validation/models/validationsManager';

let validationsManager: ValidationsManager;

describe('ValidationsManager', () => {
  describe('#validate', () => {
    beforeEach(() => {
      validationsManager = new ValidationsManager({ log: jest.fn() });
    });
    afterEach(() => {});

    it('returns valid', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValueOnce(0);
      const validation = { validations: 'valid' };

      const getPromise = validationsManager.validate(faker.random.word());

      await expect(getPromise).resolves.toStrictEqual(validation);
    });

    it('returns invalid', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValueOnce(1);
      const validation = { validations: 'invalid' };

      const getPromise = validationsManager.validate(faker.random.word());

      await expect(getPromise).resolves.toStrictEqual(validation);
    });

    it('rejects on process execution error', async () => {
      /*jest.spyOn(global.Math, 'random').mockRejectedValue(new Error('Async error'));

      const getPromise = validationsManager.validate(faker.random.word());

      await expect(getPromise).rejects.toThrow('Async error');*/
    });

    it('returns undefined if model path not found', async () => {
      /*const getPromise = validationsManager.validate(faker.random.word());

      await expect(getPromise).resolves.toBeUndefined();*/
    });
  });
});
