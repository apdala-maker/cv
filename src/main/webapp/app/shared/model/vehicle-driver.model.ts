export interface IVehicleDriver {
  id?: number;
  modelCode?: string;
  makeCode?: string;
  vehicleTypeCode?: string;
  year?: number;
  registrationNumber?: string;
  color?: string;
}

export const defaultValue: Readonly<IVehicleDriver> = {};
