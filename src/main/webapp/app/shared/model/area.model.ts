import { Moment } from 'moment';

export interface IArea {
  id?: number;
  countryCode?: string;
  areaCode?: string;
  address?: string;
  name?: string;
  northEastLatitude?: string;
  southWestLatitude?: string;
  northEastLongitude?: string;
  southWestLongitude?: string;
  isActive?: boolean;
  isApproved?: boolean;
  approvedBy?: string;
  activatedBy?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IArea> = {
  isActive: false,
  isApproved: false
};
