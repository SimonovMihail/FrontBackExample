import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';

import { YAML_CONFIG_FILENAME } from '@Store/index';

/**
 * Возвращает конфигурацию приложения
 */
export function getConfig(): any {
  const pathToConfig = path.join(process.cwd(), YAML_CONFIG_FILENAME);

  return Object(load(fs.readFileSync(pathToConfig, 'utf8')));
}
