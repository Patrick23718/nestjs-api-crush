import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import helmet from "helmet";
import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(csurf());

  // Set configuration option
  const adminConfig: ServiceAccount = {
    projectId: process.env.project_id,
    privateKey: process.env.private_key.replace(/\\n/g, '\n'),
    clientEmail: process.env.client_email
  }
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.databaseURL
  });

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
