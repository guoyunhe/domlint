export interface DOMLintReport {
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
