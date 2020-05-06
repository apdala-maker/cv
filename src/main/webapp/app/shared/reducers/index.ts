import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import chartOfAccounts, {
  ChartOfAccountsState
} from 'app/entities/chart-of-accounts/chart-of-accounts.reducer';
// prettier-ignore
import chartOfAccountsGroup, {
  ChartOfAccountsGroupState
} from 'app/entities/chart-of-accounts-group/chart-of-accounts-group.reducer';
// prettier-ignore
import customerTransaction, {
  CustomerTransactionState
} from 'app/entities/customer-transaction/customer-transaction.reducer';
// prettier-ignore
import driverTransaction, {
  DriverTransactionState
} from 'app/entities/driver-transaction/driver-transaction.reducer';
// prettier-ignore
import journalTransaction, {
  JournalTransactionState
} from 'app/entities/journal-transaction/journal-transaction.reducer';
// prettier-ignore
import price, {
  PriceState
} from 'app/entities/price/price.reducer';
// prettier-ignore
import promoCodeTransaction, {
  PromoCodeTransactionState
} from 'app/entities/promo-code-transaction/promo-code-transaction.reducer';
// prettier-ignore
import promoCodes, {
  PromoCodesState
} from 'app/entities/promo-codes/promo-codes.reducer';
// prettier-ignore
import thirdPartyChargeDistributionSchedule, {
  ThirdPartyChargeDistributionScheduleState
} from 'app/entities/third-party-charge-distribution-schedule/third-party-charge-distribution-schedule.reducer';
// prettier-ignore
import timeLimits, {
  TimeLimitsState
} from 'app/entities/time-limits/time-limits.reducer';
// prettier-ignore
import transactionCharge, {
  TransactionChargeState
} from 'app/entities/transaction-charge/transaction-charge.reducer';
// prettier-ignore
import transactionThirdParty, {
  TransactionThirdPartyState
} from 'app/entities/transaction-third-party/transaction-third-party.reducer';
// prettier-ignore
import area, {
  AreaState
} from 'app/entities/area/area.reducer';
// prettier-ignore
import areaFileTypes, {
  AreaFileTypesState
} from 'app/entities/area-file-types/area-file-types.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import restrictedArea, {
  RestrictedAreaState
} from 'app/entities/restricted-area/restricted-area.reducer';
// prettier-ignore
import applicationRole, {
  ApplicationRoleState
} from 'app/entities/application-role/application-role.reducer';
// prettier-ignore
import applicationUser, {
  ApplicationUserState
} from 'app/entities/application-user/application-user.reducer';
// prettier-ignore
import device, {
  DeviceState
} from 'app/entities/device/device.reducer';
// prettier-ignore
import fcmTokens, {
  FcmTokensState
} from 'app/entities/fcm-tokens/fcm-tokens.reducer';
// prettier-ignore
import codeGenerator, {
  CodeGeneratorState
} from 'app/entities/code-generator/code-generator.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import fileStorage, {
  FileStorageState
} from 'app/entities/file-storage/file-storage.reducer';
// prettier-ignore
import smsModel, {
  SmsModelState
} from 'app/entities/sms-model/sms-model.reducer';
// prettier-ignore
import review, {
  ReviewState
} from 'app/entities/review/review.reducer';
// prettier-ignore
import tripManagement, {
  TripManagementState
} from 'app/entities/trip-management/trip-management.reducer';
// prettier-ignore
import vehicleMake, {
  VehicleMakeState
} from 'app/entities/vehicle-make/vehicle-make.reducer';
// prettier-ignore
import vehicle, {
  VehicleState
} from 'app/entities/vehicle/vehicle.reducer';
// prettier-ignore
import vehicleType, {
  VehicleTypeState
} from 'app/entities/vehicle-type/vehicle-type.reducer';
// prettier-ignore
import vehicleMapping, {
  VehicleMappingState
} from 'app/entities/vehicle-mapping/vehicle-mapping.reducer';
// prettier-ignore
import oTP, {
  OTPState
} from 'app/entities/otp/otp.reducer';
// prettier-ignore
import rating, {
  RatingState
} from 'app/entities/rating/rating.reducer';
// prettier-ignore
import identityUser, {
  IdentityUserState
} from 'app/entities/identity-user/identity-user.reducer';
// prettier-ignore
import userProfileFileTypes, {
  UserProfileFileTypesState
} from 'app/entities/user-profile-file-types/user-profile-file-types.reducer';
// prettier-ignore
import passengerIdentity, {
  PassengerIdentityState
} from 'app/entities/passenger-identity/passenger-identity.reducer';
// prettier-ignore
import complaintsCategory, {
  ComplaintsCategoryState
} from 'app/entities/complaints-category/complaints-category.reducer';
// prettier-ignore
import complaints, {
  ComplaintsState
} from 'app/entities/complaints/complaints.reducer';
// prettier-ignore
import lost, {
  LostState
} from 'app/entities/lost/lost.reducer';
// prettier-ignore
import found, {
  FoundState
} from 'app/entities/found/found.reducer';
// prettier-ignore
import deviceInformation, {
  DeviceInformationState
} from 'app/entities/device-information/device-information.reducer';
// prettier-ignore
import vehicleDriver, {
  VehicleDriverState
} from 'app/entities/vehicle-driver/vehicle-driver.reducer';
// prettier-ignore
import driverLocationUpdate, {
  DriverLocationUpdateState
} from 'app/entities/driver-location-update/driver-location-update.reducer';
// prettier-ignore
import locationData, {
  LocationDataState
} from 'app/entities/location-data/location-data.reducer';
// prettier-ignore
import mongoFileTypes, {
  MongoFileTypesState
} from 'app/entities/mongo-file-types/mongo-file-types.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import passenger, {
  PassengerState
} from 'app/entities/passenger/passenger.reducer';
// prettier-ignore
import passengerLocationUpdate, {
  PassengerLocationUpdateState
} from 'app/entities/passenger-location-update/passenger-location-update.reducer';
// prettier-ignore
import onlineTimes, {
  OnlineTimesState
} from 'app/entities/online-times/online-times.reducer';
// prettier-ignore
import driverOpenedAppTimes, {
  DriverOpenedAppTimesState
} from 'app/entities/driver-opened-app-times/driver-opened-app-times.reducer';
// prettier-ignore
import priceMongoModel, {
  PriceMongoModelState
} from 'app/entities/price-mongo-model/price-mongo-model.reducer';
// prettier-ignore
import stops, {
  StopsState
} from 'app/entities/stops/stops.reducer';
// prettier-ignore
import userLocation, {
  UserLocationState
} from 'app/entities/user-location/user-location.reducer';
// prettier-ignore
import trip, {
  TripState
} from 'app/entities/trip/trip.reducer';
// prettier-ignore
import tripQueue, {
  TripQueueState
} from 'app/entities/trip-queue/trip-queue.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly chartOfAccounts: ChartOfAccountsState;
  readonly chartOfAccountsGroup: ChartOfAccountsGroupState;
  readonly customerTransaction: CustomerTransactionState;
  readonly driverTransaction: DriverTransactionState;
  readonly journalTransaction: JournalTransactionState;
  readonly price: PriceState;
  readonly promoCodeTransaction: PromoCodeTransactionState;
  readonly promoCodes: PromoCodesState;
  readonly thirdPartyChargeDistributionSchedule: ThirdPartyChargeDistributionScheduleState;
  readonly timeLimits: TimeLimitsState;
  readonly transactionCharge: TransactionChargeState;
  readonly transactionThirdParty: TransactionThirdPartyState;
  readonly area: AreaState;
  readonly areaFileTypes: AreaFileTypesState;
  readonly country: CountryState;
  readonly restrictedArea: RestrictedAreaState;
  readonly applicationRole: ApplicationRoleState;
  readonly applicationUser: ApplicationUserState;
  readonly device: DeviceState;
  readonly fcmTokens: FcmTokensState;
  readonly codeGenerator: CodeGeneratorState;
  readonly company: CompanyState;
  readonly fileStorage: FileStorageState;
  readonly smsModel: SmsModelState;
  readonly review: ReviewState;
  readonly tripManagement: TripManagementState;
  readonly vehicleMake: VehicleMakeState;
  readonly vehicle: VehicleState;
  readonly vehicleType: VehicleTypeState;
  readonly vehicleMapping: VehicleMappingState;
  readonly oTP: OTPState;
  readonly rating: RatingState;
  readonly identityUser: IdentityUserState;
  readonly userProfileFileTypes: UserProfileFileTypesState;
  readonly passengerIdentity: PassengerIdentityState;
  readonly complaintsCategory: ComplaintsCategoryState;
  readonly complaints: ComplaintsState;
  readonly lost: LostState;
  readonly found: FoundState;
  readonly deviceInformation: DeviceInformationState;
  readonly vehicleDriver: VehicleDriverState;
  readonly driverLocationUpdate: DriverLocationUpdateState;
  readonly locationData: LocationDataState;
  readonly mongoFileTypes: MongoFileTypesState;
  readonly driver: DriverState;
  readonly passenger: PassengerState;
  readonly passengerLocationUpdate: PassengerLocationUpdateState;
  readonly onlineTimes: OnlineTimesState;
  readonly driverOpenedAppTimes: DriverOpenedAppTimesState;
  readonly priceMongoModel: PriceMongoModelState;
  readonly stops: StopsState;
  readonly userLocation: UserLocationState;
  readonly trip: TripState;
  readonly tripQueue: TripQueueState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  chartOfAccounts,
  chartOfAccountsGroup,
  customerTransaction,
  driverTransaction,
  journalTransaction,
  price,
  promoCodeTransaction,
  promoCodes,
  thirdPartyChargeDistributionSchedule,
  timeLimits,
  transactionCharge,
  transactionThirdParty,
  area,
  areaFileTypes,
  country,
  restrictedArea,
  applicationRole,
  applicationUser,
  device,
  fcmTokens,
  codeGenerator,
  company,
  fileStorage,
  smsModel,
  review,
  tripManagement,
  vehicleMake,
  vehicle,
  vehicleType,
  vehicleMapping,
  oTP,
  rating,
  identityUser,
  userProfileFileTypes,
  passengerIdentity,
  complaintsCategory,
  complaints,
  lost,
  found,
  deviceInformation,
  vehicleDriver,
  driverLocationUpdate,
  locationData,
  mongoFileTypes,
  driver,
  passenger,
  passengerLocationUpdate,
  onlineTimes,
  driverOpenedAppTimes,
  priceMongoModel,
  stops,
  userLocation,
  trip,
  tripQueue,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
