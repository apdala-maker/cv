import { Moment } from 'moment';

export interface IPromoCodes {
  id?: number;
  code?: string;
  startHour?: number;
  endHour?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IPromoCodes> = {};
