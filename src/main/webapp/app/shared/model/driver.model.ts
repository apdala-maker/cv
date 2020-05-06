import { Moment } from 'moment';
import { ILocationData } from 'app/shared/model/location-data.model';
import { IVehicleDriver } from 'app/shared/model/vehicle-driver.model';
import { IMongoFileTypes } from 'app/shared/model/mongo-file-types.model';

export interface IDriver {
  id?: number;
  status?: string;
  iSDriving?: boolean;
  ontrip?: string;
  iSApproved?: boolean;
  driverCode?: string;
  tripCount?: number;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  latestLocation?: ILocationData;
  myVehicle?: IVehicleDriver;
  mongoFileTypes?: IMongoFileTypes;
}

export const defaultValue: Readonly<IDriver> = {
  iSDriving: false,
  iSApproved: false
};
