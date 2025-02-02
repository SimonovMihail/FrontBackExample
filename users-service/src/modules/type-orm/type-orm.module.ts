import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

/**
 * Создает конфиг для подключения к бд
 */
function createDataSourceOptions(
  configService: ConfigService,
): DataSourceOptions {
  const cnf = {
    host: configService.get<string>('microservices.users.db.host'),
    port: configService.get<number>('microservices.users.db.port'),
    username: configService.get<string>('microservices.users.db.username'),
    password: configService.get<string>('microservices.users.db.password'),
    database: configService.get<string>('microservices.users.db.database'),

    // Synchronize = true обеспечивает синхронизацию сущностей с базой данных при каждом запуске приложения 
    // Выключить на prod режиме (возможно потерять данные)
    synchronize: configService.get<boolean>('microservices.users.db.synchronize'),

    // Автоматически загружать сущности в модули через .forFeature([ ... ]) (не влияет на prod)
    autoLoadEntities: configService.get<boolean>('microservices.users.db.auto-load-entities'),
  };

  return { ...cnf, type: 'postgres' };
}

/**
 * Настройки подключения бд
 */
export const UsersTypeOrm = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config) => createDataSourceOptions(config),
  inject: [ConfigService],
});
