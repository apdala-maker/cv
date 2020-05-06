import { Moment } from 'moment';

export interface IJournalTransaction {
  id?: number;
  areaCode?: string;
  recordNumber?: number;
  driverCode?: string;
  debit?: number;
  credit?: number;
  transactionReference?: string;
  narration?: string;
  transactionDate?: Moment;
  batchNumber?: string;
  transactionCode?: string;
  folio?: string;
  hashCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IJournalTransaction> = {};
