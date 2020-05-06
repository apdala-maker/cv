import { Moment } from 'moment';
import { ILocationData } from 'app/shared/model/location-data.model';

export interface IPassenger {
  id?: number;
  status?: string;
  passengerCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  latestLocation?: ILocationData;
}

export const defaultValue: Readonly<IPassenger> = {};
