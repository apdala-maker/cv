import { Moment } from 'moment';
import { ILocationData } from 'app/shared/model/location-data.model';

export interface IDriverLocationUpdate {
  id?: number;
  driverCode?: string;
  startTime?: Moment;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  locationData?: ILocationData;
}

export const defaultValue: Readonly<IDriverLocationUpdate> = {};
