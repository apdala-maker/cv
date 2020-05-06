import { Moment } from 'moment';

export interface ITripManagement {
  id?: number;
  areaCode?: string;
  startime?: Moment;
  endtime?: Moment;
  startLongitude?: string;
  startLatitude?: string;
  distance?: number;
  tripCost?: number;
  driverCode?: string;
  passengerCode?: string;
  status?: string;
  tripCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ITripManagement> = {};
