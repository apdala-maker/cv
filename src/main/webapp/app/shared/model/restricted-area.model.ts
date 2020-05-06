import { Moment } from 'moment';

export interface IRestrictedArea {
  id?: number;
  areaCode?: string;
  name?: string;
  northEastLatitude?: string;
  southWestLatitude?: string;
  northEastLongitude?: string;
  southWestLongitude?: string;
  vehicleTypeCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IRestrictedArea> = {};
