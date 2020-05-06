import { Moment } from 'moment';

export interface IDeviceInformation {
  id?: number;
  userCode?: string;
  userType?: string;
  model?: string;
  name?: string;
  width?: number;
  length?: number;
  oS?: string;
  manufacturer?: string;
  deviceId?: string;
  osVersion?: string;
  brand?: string;
  screenSize?: string;
  serial?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IDeviceInformation> = {};
