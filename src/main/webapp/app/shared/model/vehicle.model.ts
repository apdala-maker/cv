import { Moment } from 'moment';

export interface IVehicle {
  id?: number;
  modelName?: string;
  modelCode?: string;
  makeCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IVehicle> = {};
