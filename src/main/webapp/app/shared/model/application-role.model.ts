import { Moment } from 'moment';

export interface IApplicationRole {
  id?: number;
  access?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IApplicationRole> = {};
