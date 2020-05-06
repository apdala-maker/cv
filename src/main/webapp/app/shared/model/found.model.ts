import { Moment } from 'moment';

export interface IFound {
  id?: number;
  tripCode?: string;
  dateFound?: Moment;
  userCode?: string;
  description?: string;
  itemName?: string;
  isReturned?: boolean;
  referenceCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IFound> = {
  isReturned: false
};
