import { Moment } from 'moment';
import { IPriceMongoModel } from 'app/shared/model/price-mongo-model.model';
import { IRating } from 'app/shared/model/rating.model';
import { IStops } from 'app/shared/model/stops.model';
import { TripStatus } from 'app/shared/model/enumerations/trip-status.model';
import { TripType } from 'app/shared/model/enumerations/trip-type.model';

export interface ITrip {
  id?: number;
  tripCode?: string;
  driverCode?: string;
  vehicleCode?: string;
  tripStatus?: TripStatus;
  dateEnded?: Moment;
  tripStartDate?: Moment;
  arrivedDate?: Moment;
  tripInitiatedDate?: Moment;
  passengerCode?: string;
  pickUpLongitude?: string;
  pickUpLatitude?: string;
  dropOfLatitude?: string;
  dropOfLongitude?: string;
  projectedAmount?: number;
  totalDistanceInMetresCoverd?: number;
  actualAmountPaid?: number;
  cancelledBy?: string;
  tripType?: TripType;
  areaCode?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  priceMongoModel?: IPriceMongoModel;
  rating?: IRating;
  stops?: IStops;
}

export const defaultValue: Readonly<ITrip> = {};
