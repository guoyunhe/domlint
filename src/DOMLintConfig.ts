import { DOMLintRule } from './DOMLintRule';

export interface DOMLintConfig {
  rules?: Record<string, DOMLintRule>;
}
