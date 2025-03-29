export interface DomlintOptions {
  lastNameUpperCase?: boolean;
}

export function domlint(firstName: string, lastName: string, options?: DomlintOptions) {
  if (options?.lastNameUpperCase) {
    return `${firstName} ${lastName.toLocaleUpperCase()}`;
  }
  return `${firstName} ${lastName}`;
}
