import { Moment } from 'moment';

export interface IDevice {
  id?: number;
  userCode?: string;
  deviceId?: string;
  version?: string;
  model?: string;
  screenSize?: string;
  manufacture?: string;
  macAddresses?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IDevice> = {};
