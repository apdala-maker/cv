import { Moment } from 'moment';

export interface IVehicleMapping {
  id?: number;
  makeCode?: string;
  userCode?: string;
  modelCode?: string;
  year?: number;
  registrationNumber?: string;
  vehicleTypeCode?: string;
  areaCode?: string;
  isApproved?: boolean;
  approvedBy?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IVehicleMapping> = {
  isApproved: false
};
