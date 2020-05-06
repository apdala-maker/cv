import { Moment } from 'moment';

export interface IApplicationUser {
  id?: number;
  userCode?: string;
  name?: string;
  countryCode?: string;
  areaCode?: string;
  gender?: string;
  companyCode?: string;
  currentRating?: number;
  userType?: string;
  isActive?: boolean;
  isApproved?: boolean;
  approvedBy?: string;
  activatedBy?: string;
  imageUrl?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IApplicationUser> = {
  isActive: false,
  isApproved: false
};
