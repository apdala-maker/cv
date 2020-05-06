import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChartOfAccounts from './chart-of-accounts';
import ChartOfAccountsGroup from './chart-of-accounts-group';
import CustomerTransaction from './customer-transaction';
import DriverTransaction from './driver-transaction';
import JournalTransaction from './journal-transaction';
import Price from './price';
import PromoCodeTransaction from './promo-code-transaction';
import PromoCodes from './promo-codes';
import ThirdPartyChargeDistributionSchedule from './third-party-charge-distribution-schedule';
import TimeLimits from './time-limits';
import TransactionCharge from './transaction-charge';
import TransactionThirdParty from './transaction-third-party';
import Area from './area';
import AreaFileTypes from './area-file-types';
import Country from './country';
import RestrictedArea from './restricted-area';
import ApplicationRole from './application-role';
import ApplicationUser from './application-user';
import Device from './device';
import FcmTokens from './fcm-tokens';
import CodeGenerator from './code-generator';
import Company from './company';
import FileStorage from './file-storage';
import SmsModel from './sms-model';
import Review from './review';
import TripManagement from './trip-management';
import VehicleMake from './vehicle-make';
import Vehicle from './vehicle';
import VehicleType from './vehicle-type';
import VehicleMapping from './vehicle-mapping';
import OTP from './otp';
import Rating from './rating';
import IdentityUser from './identity-user';
import UserProfileFileTypes from './user-profile-file-types';
import PassengerIdentity from './passenger-identity';
import ComplaintsCategory from './complaints-category';
import Complaints from './complaints';
import Lost from './lost';
import Found from './found';
import DeviceInformation from './device-information';
import VehicleDriver from './vehicle-driver';
import DriverLocationUpdate from './driver-location-update';
import LocationData from './location-data';
import MongoFileTypes from './mongo-file-types';
import Driver from './driver';
import Passenger from './passenger';
import PassengerLocationUpdate from './passenger-location-update';
import OnlineTimes from './online-times';
import DriverOpenedAppTimes from './driver-opened-app-times';
import PriceMongoModel from './price-mongo-model';
import Stops from './stops';
import UserLocation from './user-location';
import Trip from './trip';
import TripQueue from './trip-queue';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}chart-of-accounts`} component={ChartOfAccounts} />
      <ErrorBoundaryRoute path={`${match.url}chart-of-accounts-group`} component={ChartOfAccountsGroup} />
      <ErrorBoundaryRoute path={`${match.url}customer-transaction`} component={CustomerTransaction} />
      <ErrorBoundaryRoute path={`${match.url}driver-transaction`} component={DriverTransaction} />
      <ErrorBoundaryRoute path={`${match.url}journal-transaction`} component={JournalTransaction} />
      <ErrorBoundaryRoute path={`${match.url}price`} component={Price} />
      <ErrorBoundaryRoute path={`${match.url}promo-code-transaction`} component={PromoCodeTransaction} />
      <ErrorBoundaryRoute path={`${match.url}promo-codes`} component={PromoCodes} />
      <ErrorBoundaryRoute path={`${match.url}third-party-charge-distribution-schedule`} component={ThirdPartyChargeDistributionSchedule} />
      <ErrorBoundaryRoute path={`${match.url}time-limits`} component={TimeLimits} />
      <ErrorBoundaryRoute path={`${match.url}transaction-charge`} component={TransactionCharge} />
      <ErrorBoundaryRoute path={`${match.url}transaction-third-party`} component={TransactionThirdParty} />
      <ErrorBoundaryRoute path={`${match.url}area`} component={Area} />
      <ErrorBoundaryRoute path={`${match.url}area-file-types`} component={AreaFileTypes} />
      <ErrorBoundaryRoute path={`${match.url}country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}restricted-area`} component={RestrictedArea} />
      <ErrorBoundaryRoute path={`${match.url}application-role`} component={ApplicationRole} />
      <ErrorBoundaryRoute path={`${match.url}application-user`} component={ApplicationUser} />
      <ErrorBoundaryRoute path={`${match.url}device`} component={Device} />
      <ErrorBoundaryRoute path={`${match.url}fcm-tokens`} component={FcmTokens} />
      <ErrorBoundaryRoute path={`${match.url}code-generator`} component={CodeGenerator} />
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}file-storage`} component={FileStorage} />
      <ErrorBoundaryRoute path={`${match.url}sms-model`} component={SmsModel} />
      <ErrorBoundaryRoute path={`${match.url}review`} component={Review} />
      <ErrorBoundaryRoute path={`${match.url}trip-management`} component={TripManagement} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-make`} component={VehicleMake} />
      <ErrorBoundaryRoute path={`${match.url}vehicle`} component={Vehicle} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-type`} component={VehicleType} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-mapping`} component={VehicleMapping} />
      <ErrorBoundaryRoute path={`${match.url}otp`} component={OTP} />
      <ErrorBoundaryRoute path={`${match.url}rating`} component={Rating} />
      <ErrorBoundaryRoute path={`${match.url}identity-user`} component={IdentityUser} />
      <ErrorBoundaryRoute path={`${match.url}user-profile-file-types`} component={UserProfileFileTypes} />
      <ErrorBoundaryRoute path={`${match.url}passenger-identity`} component={PassengerIdentity} />
      <ErrorBoundaryRoute path={`${match.url}complaints-category`} component={ComplaintsCategory} />
      <ErrorBoundaryRoute path={`${match.url}complaints`} component={Complaints} />
      <ErrorBoundaryRoute path={`${match.url}lost`} component={Lost} />
      <ErrorBoundaryRoute path={`${match.url}found`} component={Found} />
      <ErrorBoundaryRoute path={`${match.url}device-information`} component={DeviceInformation} />
      <ErrorBoundaryRoute path={`${match.url}vehicle-driver`} component={VehicleDriver} />
      <ErrorBoundaryRoute path={`${match.url}driver-location-update`} component={DriverLocationUpdate} />
      <ErrorBoundaryRoute path={`${match.url}location-data`} component={LocationData} />
      <ErrorBoundaryRoute path={`${match.url}mongo-file-types`} component={MongoFileTypes} />
      <ErrorBoundaryRoute path={`${match.url}driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}passenger`} component={Passenger} />
      <ErrorBoundaryRoute path={`${match.url}passenger-location-update`} component={PassengerLocationUpdate} />
      <ErrorBoundaryRoute path={`${match.url}online-times`} component={OnlineTimes} />
      <ErrorBoundaryRoute path={`${match.url}driver-opened-app-times`} component={DriverOpenedAppTimes} />
      <ErrorBoundaryRoute path={`${match.url}price-mongo-model`} component={PriceMongoModel} />
      <ErrorBoundaryRoute path={`${match.url}stops`} component={Stops} />
      <ErrorBoundaryRoute path={`${match.url}user-location`} component={UserLocation} />
      <ErrorBoundaryRoute path={`${match.url}trip`} component={Trip} />
      <ErrorBoundaryRoute path={`${match.url}trip-queue`} component={TripQueue} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
