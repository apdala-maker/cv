import { Moment } from 'moment';
import { PaymentChannel } from 'app/shared/model/enumerations/payment-channel.model';

export interface ICustomerTransaction {
  id?: number;
  areaCode?: string;
  recordNumber?: number;
  customerCode?: string;
  driverCode?: string;
  debit?: number;
  credit?: number;
  narration?: string;
  transactionReference?: string;
  transactionCode?: string;
  paymentChannel?: PaymentChannel;
  isReversed?: string;
  hashCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ICustomerTransaction> = {};
