import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';

import { AppModule } from '@Modules/app.module';
import { getConfig } from '@Utils/getConfig';

/**
 * Запускает основное приложение микросервиса
 */
async function bootstrapService(): Promise<void> {
  const logger = new Logger(bootstrapService.name);

  const config = getConfig().microservices.users;
  const port = config.port;

  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port },
  };

  const app = await NestFactory.createMicroservice(AppModule, tcpOptions);

  await app
    .listen()
    .then(() => logger.verbose(`Microservice users is running on ${config.port} port`))
}

bootstrapService();
