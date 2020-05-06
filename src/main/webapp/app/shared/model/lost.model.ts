import { Moment } from 'moment';

export interface ILost {
  id?: number;
  tripCode?: string;
  dateLost?: Moment;
  userCode?: string;
  description?: string;
  itemName?: string;
  isFound?: boolean;
  referenceCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<ILost> = {
  isFound: false
};
