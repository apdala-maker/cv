import { Moment } from 'moment';

export interface IPromoCodeTransaction {
  id?: number;
  code?: string;
  recordNumber?: number;
  customerCode?: string;
  driverCode?: string;
  debit?: number;
  credit?: number;
  narration?: string;
  transactionReference?: string;
  transactionCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IPromoCodeTransaction> = {};
