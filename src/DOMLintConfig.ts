export interface DOMLintConfig {
  threshold?: {
    good: number;
    okay: number;
  };
  rules?: Record<string, DOMLintElementRule>;
  ignore?: string[];
}

export interface DOMLintElementRule {
  exist?: DOMLintRule;
  deprecated?: DOMLintRule;
  style?: Record<string, DOMLintRule>;
}

export interface DOMLintRule {
  goodness?: number;
  badness?: number;
  expected?: string | string[];
}
