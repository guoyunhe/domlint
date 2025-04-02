export interface DOMLintConfig {
  threshold?: {
    good: number;
    okay: number;
  };
  rules?: Record<string, DOMLintElementRule>;
  ignore?: string[];
}

export interface DOMLintElementRule {
  select?: string | ((elem: Element) => boolean);
  ignore?: string | ((elem: Element) => boolean);
  exist?: DOMLintRule;
  deprecated?: DOMLintRule;
  style?: Record<string, DOMLintRule>;
}

export interface DOMLintRule {
  goodness?: number;
  badness?: number;
  expect?: string | string[];
  ignore?: string | string[];
}
