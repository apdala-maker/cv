import { Moment } from 'moment';

export interface ICountry {
  id?: number;
  countryName?: string;
  countryCode?: string;
  currencyName?: string;
  currencyCode?: string;
  currencySymbol?: string;
  language?: string;
  timeZone?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ICountry> = {};
