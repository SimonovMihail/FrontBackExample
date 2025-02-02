import { Module, type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'

import { MsNames } from '@MS/ms.types';

const maNames = Object.values(MsNames);

/**
 * Модуль предоставляет доступ к другим микросервисам
 */
@Module({
  providers: loadMicroservicesConfigs(maNames),
  exports: maNames,
})
export class MsModule {}

/**
 * Загружает конфигурации микросервисов
 */
function loadMicroservicesConfigs(names: string[]): Provider[]  {
  return names.map((msName) => ({
    provide: msName,
    useFactory: (configService: ConfigService) => loadMicroserviceConfig(msName, configService),
    inject: [ConfigService],
  }));
}

/**
 * Загружает конфигурации микросервисов
 */
function loadMicroserviceConfig(
  msName: string,
  configService: ConfigService
): ClientProxy {
  const host = configService.get(`microservices.${msName}.host`);
  const port = configService.get(`microservices.${msName}.port`);
  const client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { host, port },
  });

  return client
}

