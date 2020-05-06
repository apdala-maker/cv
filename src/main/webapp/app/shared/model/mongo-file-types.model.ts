import { Moment } from 'moment';

export interface IMongoFileTypes {
  id?: number;
  fileName?: string;
  fileType?: string;
  narration?: string;
  areaFileTypeCode?: string;
  expiryDate?: Moment;
}

export const defaultValue: Readonly<IMongoFileTypes> = {};
