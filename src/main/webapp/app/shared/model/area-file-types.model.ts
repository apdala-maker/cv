import { Moment } from 'moment';

export interface IAreaFileTypes {
  id?: number;
  code?: string;
  areaCode?: string;
  isManadatory?: boolean;
  description?: string;
  hasExpiry?: boolean;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IAreaFileTypes> = {
  isManadatory: false,
  hasExpiry: false
};
