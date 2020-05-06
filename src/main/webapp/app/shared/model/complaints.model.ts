import { Moment } from 'moment';
import { IComplaintsCategory } from 'app/shared/model/complaints-category.model';
import { Audience } from 'app/shared/model/enumerations/audience.model';
import { ComplaintStatus } from 'app/shared/model/enumerations/complaint-status.model';

export interface IComplaints {
  id?: number;
  userCode?: string;
  category?: string;
  description?: string;
  audience?: Audience;
  status?: ComplaintStatus;
  feedBack?: string;
  referenceCode?: string;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  complaintsCategory?: IComplaintsCategory;
}

export const defaultValue: Readonly<IComplaints> = {};
