import { Moment } from 'moment';

export interface ITripQueue {
  id?: number;
  tripCode?: string;
  driverCode?: string;
  passengerCode?: string;
  status?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<ITripQueue> = {};
