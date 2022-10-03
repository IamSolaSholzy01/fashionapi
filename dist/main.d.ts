import * as functions from 'firebase-functions';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
export declare const createNestServer: (expressInstance: express.Express) => Promise<NestExpressApplication>;
export declare const api: functions.HttpsFunction;
