import { Moment } from 'moment';

export interface IDriverOpenedAppTimes {
  id?: number;
  driverCode?: string;
  dateOpened?: Moment;
  tripCount?: number;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IDriverOpenedAppTimes> = {};
