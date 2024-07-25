import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';
import { setupSwagger } from './swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  const expressApp = app.getHttpAdapter();
  const expressAdapter = expressApp as ExpressAdapter;
  expressAdapter.setViewEngine('ejs');
  expressAdapter.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(3000);
}
bootstrap();
