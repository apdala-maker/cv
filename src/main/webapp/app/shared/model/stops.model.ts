export interface IStops {
  id?: number;
  latitude?: string;
  longitude?: string;
  order?: number;
}

export const defaultValue: Readonly<IStops> = {};
