import { Moment } from 'moment';
import { ILocationData } from 'app/shared/model/location-data.model';

export interface IPassengerLocationUpdate {
  id?: number;
  passengerCode?: string;
  startTime?: Moment;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  locationData?: ILocationData;
}

export const defaultValue: Readonly<IPassengerLocationUpdate> = {};
