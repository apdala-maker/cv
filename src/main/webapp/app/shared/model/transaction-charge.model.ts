import { Moment } from 'moment';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface ITransactionCharge {
  id?: number;
  areaCode?: string;
  code?: string;
  category?: Category;
  description?: string;
  timeLimitCode?: string;
  constantCharge?: number;
  chargePerKilometer?: number;
  chargePerMinute?: number;
  status?: string;
  vehicleCode?: string;
  totalMinimumCharge?: number;
  totalMaximumCharge?: number;
  minimumSpeed?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ITransactionCharge> = {};
