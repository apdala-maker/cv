import { Moment } from 'moment';

export interface IFcmTokens {
  id?: number;
  userCode?: string;
  token?: string;
  isActive?: boolean;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IFcmTokens> = {
  isActive: false
};
