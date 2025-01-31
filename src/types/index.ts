export type NavigationType = 'Home' | 'Optimized' | 'Metric Meta' | 'Sensibility';

export const navigationList: NavigationType[] = ['Home', 'Optimized', 'Metric Meta', 'Sensibility'];

export type ParamsType = 'url' | 'domain' | 'user' | 'password' | 'sha256';

export const paramsList: ParamsType[] = ['url', 'domain', 'user', 'password', 'sha256'];

export type EqualType =
  | '='
  | '!='
  | '<'
  | '>'
  | '<='
  | '>='
  | 'starts with'
  | 'contains'
  | 'in'
  | 'not in';

export const equalList: EqualType[] = [
  '=',
  '!=',
  '<',
  '>',
  '<=',
  '>=',
  'starts with',
  'contains',
  'in',
  'not in',
];

export type DataType = {
  url: string;
  domain: string;
  user: string;
  password: string;
  sha256: string;
};
