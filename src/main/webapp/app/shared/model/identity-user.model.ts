import { Moment } from 'moment';
import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';

export interface IIdentityUser {
  id?: number;
  userCode?: string;
  name?: string;
  countryCode?: string;
  areaCode?: string;
  gender?: string;
  companyCode?: string;
  affliateCode?: string;
  currentRating?: number;
  userType?: string;
  isActive?: boolean;
  registrationStep?: string;
  isApproved?: boolean;
  approvedBy?: string;
  activatedBy?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  userProfileFileTypes?: IUserProfileFileTypes;
}

export const defaultValue: Readonly<IIdentityUser> = {
  isActive: false,
  isApproved: false
};
