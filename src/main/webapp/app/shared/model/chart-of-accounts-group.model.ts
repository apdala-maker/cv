import { Moment } from 'moment';

export interface IChartOfAccountsGroup {
  id?: number;
  code?: string;
  accountType?: string;
  description?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IChartOfAccountsGroup> = {};
