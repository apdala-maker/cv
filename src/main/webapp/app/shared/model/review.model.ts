import { Moment } from 'moment';

export interface IReview {
  id?: number;
  tripCode?: string;
  userCode?: string;
  rating?: number;
  areaCode?: string;
  remarks?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IReview> = {};
