import { Moment } from 'moment';
import { IUserProfileFileTypes } from 'app/shared/model/user-profile-file-types.model';

export interface IPassengerIdentity {
  id?: number;
  userCode?: string;
  name?: string;
  countryCode?: string;
  areaCode?: string;
  referralCode?: string;
  gender?: string;
  companyCode?: string;
  currentRating?: number;
  userType?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  userProfileFileTypes?: IUserProfileFileTypes;
}

export const defaultValue: Readonly<IPassengerIdentity> = {};
