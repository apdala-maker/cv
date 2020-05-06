import { Moment } from 'moment';

export interface ISmsModel {
  id?: number;
  phoneNumber?: string;
  message?: string;
  isSend?: boolean;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ISmsModel> = {
  isSend: false
};
