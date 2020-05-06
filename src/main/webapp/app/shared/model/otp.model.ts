import { Moment } from 'moment';

export interface IOTP {
  id?: number;
  phoneNumber?: string;
  userCode?: string;
  areaCode?: string;
  oTPCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IOTP> = {};
