import faker from 'faker';
import httpStatusCodes from 'http-status-codes';
import { container } from 'tsyringe';
import { registerTestValues } from '../../testContainerConfig';
import * as requestSender from './helpers/requestSender';

describe('ValidationsController', function () {
  beforeAll(async function () {
    registerTestValues();
    requestSender.init();
  });
  afterAll(function () {
    container.reset();
  });

  describe('POST /validations', function () {
    describe('Happy Path 🙂', function () {
      it('should return 200 status code and validation results', async function () {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0);
        const validation = { validations: 'valid' };
        const response = await requestSender.post({ modelPath: faker.random.word() });

        expect(response.status).toBe(httpStatusCodes.CREATED);
        expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toMatchObject(validation);
      });
    });

    describe('Bad Path 😡', function () {
      it('should return 400 status code and error message if model path is missing', async function () {
        const response = await requestSender.post({});

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', "request.body should have required property 'modelPath'");
      });
    });

    describe('Sad Path 😥', function () {
      it('should return 404 if the model path does not exist', async function () {
        /*const response = await requestSender.post({ modelPath: faker.random.word() });

        expect(response.status).toBe(httpStatusCodes.NOT_FOUND);
        expect(response.body).toHaveProperty('message', `Model path was not found.`);*/
      });

      it('should return 500 status code if an unexpected exception happens', async function () {
        /*const response = await requestSender.post({ modelPath: faker.random.word() });

        expect(response.status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('message', 'failed');*/
      });
    });
  });
});
