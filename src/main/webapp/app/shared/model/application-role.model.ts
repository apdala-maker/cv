import { Moment } from 'moment';

export interface IApplicationRole {
  id?: string;
  name?: string;
  displayName?: string;
  selectedControllers?: any;
  actions?: any;
  // id?: number;
  // access?: string;
  // dateCreated?: Moment;
  // createdBy?: string;
  // creatorUserEmail?: string;
  // dateModified?: Moment;
  // modifiedBy?: string;
  // modifierUserEmail?: string;
}

export const defaultValue: Readonly<IApplicationRole> = {
  id: '',
  name: '',
  displayName: '',
  selectedControllers: [],
  actions: []
};
