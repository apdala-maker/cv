import { Moment } from 'moment';

export interface IFileStorage {
  id?: number;
  fileName?: string;
  fileType?: string;
  referenceCode?: string;
  narration?: string;
  areaFileTypeCode?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IFileStorage> = {};
