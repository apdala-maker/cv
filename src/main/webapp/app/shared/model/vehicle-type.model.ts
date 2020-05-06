import { Moment } from 'moment';

export interface IVehicleType {
  id?: number;
  areaCode?: string;
  isMotorBike?: boolean;
  description?: string;
  code?: string;
  numberOfSeats?: number;
  minimumCC?: number;
  maximumCC?: number;
  dateCreated?: Moment;
  createdBy?: string;
  creatorUserEmail?: string;
  dateModified?: Moment;
  modifiedBy?: string;
  modifierUserEmail?: string;
}

export const defaultValue: Readonly<IVehicleType> = {
  isMotorBike: false
};
