import * as supertest from 'supertest';
import { Application } from 'express';
import { container } from 'tsyringe';
import { ServerBuilder } from '../../../../../src/serverBuilder';

let app: Application;

export function init(): void {
  const builder = container.resolve<ServerBuilder>(ServerBuilder);
  app = builder.build();
}

export async function post(body: { modelPath?: unknown }): Promise<supertest.Response> {
  return supertest.agent(app).post('/validations').set('Content-Type', 'application/json').send(body);
}
