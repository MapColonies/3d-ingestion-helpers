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

  describe('GET /validations/{flowId}', function () {
    describe('Happy Path 🙂', function () {
      it('should return 200 status code and validation results', async function () {
        const validation = { status: 'valid' };
        const response = await requestSender.getValidation(faker.random.uuid());

        expect(response.status).toBe(httpStatusCodes.OK);
        expect(response.headers).toHaveProperty('content-type', 'application/json; charset=utf-8');
        expect(response.body).toMatchObject(validation);
      });
    });

    describe('Bad Path 😡', function () {
      it('should return 400 status code and error message if flow id is invalid (not a uuid format)', async function () {
        const response = await requestSender.getValidation(faker.random.word());

        expect(response.status).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('message', 'request.params.flowId should match format "uuid"');
      });
    });

    describe('Sad Path 😥', function () {
      it('should return 404 if a flow with the requested id does not exist', async function () {
        const response = await requestSender.getValidation(faker.random.uuid());

        expect(response.status).toBe(httpStatusCodes.NOT_FOUND);
        expect(response.body).toHaveProperty('message', `Flow with given id was not found.`);
      });

      it('should return 500 status code if an unexpected exception happens', async function () {
        const response = await requestSender.getValidation(faker.random.uuid());

        expect(response.status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('message', 'failed');
      });
    });
  });
});
