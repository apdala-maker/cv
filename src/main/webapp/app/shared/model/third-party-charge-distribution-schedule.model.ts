import { Moment } from 'moment';

export interface IThirdPartyChargeDistributionSchedule {
  id?: number;
  code?: string;
  partyCode?: string;
  transactionCode?: string;
  chargeMode?: string;
  value?: string;
  status?: string;
  areaCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IThirdPartyChargeDistributionSchedule> = {};
