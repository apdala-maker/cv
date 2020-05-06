import { Moment } from 'moment';

export interface IVehicleMake {
  id?: number;
  description?: string;
  makeCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IVehicleMake> = {};
