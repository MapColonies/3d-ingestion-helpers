import faker from 'faker';
import { ValidationsManager } from '../../../../src/validation/models/validationsManager';

let validationsManager: ValidationsManager;

describe('ValidationsManager', () => {
  describe('#getValidation', () => {
    beforeEach(() => {
      validationsManager = new ValidationsManager({ log: jest.fn() });
    });
    afterEach(() => {});

    it('returns validation', async () => {
      jest.spyOn(global.Math, 'random').mockReturnValueOnce(0);
      const validation = { status: 'valid' };

      const getPromise = validationsManager.getValidation(faker.random.uuid());

      await expect(getPromise).resolves.toStrictEqual(validation);
    });

    it('rejects on process execution error', async () => {
      new Error('Unexpected error happened');

      const getPromise = validationsManager.getValidation(faker.random.uuid());

      await expect(getPromise).rejects.toThrow('Unexpected error happened');
    });

    it('returns undefined flow if id not found', async () => {
      const getPromise = validationsManager.getValidation(faker.random.uuid());

      await expect(getPromise).resolves.toBeUndefined();
    });
  });
});
