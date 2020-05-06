import { Moment } from 'moment';

export interface ICompany {
  id?: number;
  displayName?: string;
  legalOrTradingName?: string;
  registrationNumber?: string;
  registrationDate?: Moment;
  companyCode?: string;
  areaCode?: string;
  countyOrState?: string;
  postalCode?: string;
  postalAddress?: string;
  cityOrTown?: string;
  street?: string;
  buildingNameOrNumber?: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  emailAddress?: string;
  website?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ICompany> = {};
