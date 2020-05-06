import { Moment } from 'moment';
import { PartyCategory } from 'app/shared/model/enumerations/party-category.model';

export interface ITransactionThirdParty {
  id?: number;
  areaCode?: string;
  partyCategory?: PartyCategory;
  code?: string;
  name?: string;
  country?: string;
  countyOrState?: string;
  postalCode?: string;
  postalAddress?: string;
  town?: string;
  street?: string;
  buildingNameOrNumber?: string;
  primaryPhoneNumber?: string;
  secondayPhoneNumber?: string;
  emailAddress?: string;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<ITransactionThirdParty> = {};
