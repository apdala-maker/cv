import { Moment } from 'moment';

export interface IPrice {
  id?: number;
  priceCode?: string;
  startTime?: Moment;
  endTime?: Moment;
  pricePerMinute?: number;
  pricePerDistantUnit?: number;
  minimumSpeedForPricePerMinute?: number;
  areaCode?: string;
  vehicleTypeCode?: string;
  cancellationFee?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IPrice> = {};
