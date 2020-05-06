import { Moment } from 'moment';

export interface IChartOfAccounts {
  id?: number;
  areaCode?: string;
  accountCode?: string;
  accountName?: string;
  isCJAccount?: string;
  cOAGroupCode?: string;
  systemPosted?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IChartOfAccounts> = {};
