export interface ILocationData {
  id?: number;
  latitude?: number;
  longitude?: number;
  bearing?: string;
}

export const defaultValue: Readonly<ILocationData> = {};
