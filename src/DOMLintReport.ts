export interface DOMLintReport {
  /**
   * Overall score, range from 0 to 100
   *
   * ```js
   * score = Math.floor(goodness / (goodness + badness) * 100)
   * ```
   */
  score: number;
  goodness: number;
  badness: number;
  elements: Record<string, DOMLintElementReport>;
}

export interface DOMLintElementReport {
  /**
   * Unique selector of the DOM element
   */
  selector: string;
  /**
   * HTML of the DOM element, maximum 255 characters
   */
  html?: string;
  /**
   * Attributes
   */
  attributes?: Record<string, DOMLintAttributeReport>;
}

export interface DOMLintAttributeReport {
  pass: boolean;
  goodness: number;
  badness: number;
  expected?: string | string[];
}
