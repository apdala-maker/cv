import { Moment } from 'moment';

export interface ITimeLimits {
  id?: number;
  areaCode?: string;
  description?: string;
  code?: string;
  category?: string;
  startHour?: number;
  startMinute?: number;
  endHour?: number;
  endMinute?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ITimeLimits> = {};
