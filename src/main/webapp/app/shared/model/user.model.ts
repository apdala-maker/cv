export interface IUser {
  areaCode?: string;
  email?: string;
  id?: string;
  name?: string;
  userCode?: string;
  status?: string;
  password?: string;

  // id?: any;
  // login?: string;
  // firstName?: string;
  // lastName?: string;
  // email?: string;
  // activated?: boolean;
  // langKey?: string;
  // authorities?: any[];
  // createdBy?: string;
  // createdDate?: Date;
  // lastModifiedBy?: string;
  // lastModifiedDate?: Date;
  // password?: string;
}

export const defaultValue: Readonly<IUser> = {
  areaCode: '',
  email: '',
  id: '',
  name: '',
  userCode: '',
  status: '',
  password: ''
  // id: '',
  // login: '',
  // firstName: '',
  // lastName: '',
  // email: '',
  // activated: true,
  // langKey: '',
  // authorities: [],
  // createdBy: '',
  // createdDate: null,
  // lastModifiedBy: '',
  // lastModifiedDate: null,
  // password: ''
};
