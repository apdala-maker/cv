import { Moment } from 'moment';

export interface IUserLocation {
  id?: number;
  latitude?: string;
  longitude?: string;
  tripCode?: string;
  userCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IUserLocation> = {};
