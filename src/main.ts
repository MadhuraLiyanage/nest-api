import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const httpsOptions= {
    key:readFileSync(resolve(__dirname, "../cert/key.pem")),
    cert:readFileSync(resolve(__dirname, "../cert/certificate.pem"))
  }

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.enableCors()

  await app.init();

  createHttpServer(server).listen(8081);
  //createHttpsServer(httpsOptions, server).listen(443);
  
  //await app.listen(443);
}
bootstrap(); 
