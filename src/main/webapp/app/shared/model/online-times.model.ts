import { Moment } from 'moment';

export interface IOnlineTimes {
  id?: number;
  start?: Moment;
  finish?: Moment;
  driverCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IOnlineTimes> = {};
