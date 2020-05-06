import { Moment } from 'moment';

export interface IRating {
  id?: number;
  userCode?: string;
  value?: number;
  remarks?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IRating> = {};
