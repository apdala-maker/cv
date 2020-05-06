import { Moment } from 'moment';

export interface ICodeGenerator {
  id?: number;
  seed?: string;
  currentNumber?: number;
  numberCategory?: string;
  prefix?: string;
  characterCount?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ICodeGenerator> = {};
