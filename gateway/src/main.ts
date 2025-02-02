import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { getConfig } from '@Utils/getConfig';
import { AppModule } from '@Modules/app.module';
import { Rpc2HttpExceptionInterceptor } from '@Interceptors/rpc-2-http.interceptor';

/**
 * Запускает gateway
 */
async function bootstrapGateway(): Promise<void> {
  const logger = new Logger(bootstrapGateway.name)

  const app = await NestFactory.create(AppModule);

  const { gateway, frontend } = getConfig();
  const port = gateway.port;
  const frontendHost = frontend.host;

  // Вытаскивает из хедеров куки и помещает их в req.cookies
  app.use(cookieParser());

  // Преобразователь Rpc в Http исключения
  app.useGlobalInterceptors(new Rpc2HttpExceptionInterceptor());

  // Подключаем CORS для фронтэнд запросов
  app.enableCors({
    origin: new RegExp(`(http|https):\/\/${frontendHost}`),
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Headers',
      'Content-Type',
      'Accept',
      'Authorization',
      'WWW-Authenticate',
      'Origin',
      'X-Auth-Token',
      'X-Requested-With',
      'X-Csrf-Token',
      'X-XSS-Protection',
    ],
    methods: '*',
    credentials: true,
  });

  await app
    .listen(port)
    .then(() => logger.verbose(`Gateway app is running on ${port}`));
}

bootstrapGateway();
