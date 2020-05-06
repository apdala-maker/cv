import { Moment } from 'moment';

export interface IUserProfileFileTypes {
  id?: number;
  iSActive?: boolean;
  profileImage?: string;
  dateCreated?: Moment;
}

export const defaultValue: Readonly<IUserProfileFileTypes> = {
  iSActive: false
};
