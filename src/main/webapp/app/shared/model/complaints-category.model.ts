import { Moment } from 'moment';
import { Audience } from 'app/shared/model/enumerations/audience.model';

export interface IComplaintsCategory {
  id?: number;
  categoryCode?: string;
  description?: string;
  audience?: Audience;
  urgencyScale?: number;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
}

export const defaultValue: Readonly<IComplaintsCategory> = {};
