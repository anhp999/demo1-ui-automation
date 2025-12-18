import { ENV } from './index';

export function getEnv<K extends keyof typeof ENV>(key: K): typeof ENV[K] {
  return ENV[key];
}
