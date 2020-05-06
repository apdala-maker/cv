import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <h1>Quick Links</h1>
    <MenuItem icon="asterisk" to="/chart-of-accounts">
      <Translate contentKey="global.menu.entities.chartOfAccounts" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/chart-of-accounts-group">
      <Translate contentKey="global.menu.entities.chartOfAccountsGroup" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/customer-transaction">
      <Translate contentKey="global.menu.entities.customerTransaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver-transaction">
      <Translate contentKey="global.menu.entities.driverTransaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/journal-transaction">
      <Translate contentKey="global.menu.entities.journalTransaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/price">
      <Translate contentKey="global.menu.entities.price" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/promo-code-transaction">
      <Translate contentKey="global.menu.entities.promoCodeTransaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/promo-codes">
      <Translate contentKey="global.menu.entities.promoCodes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/third-party-charge-distribution-schedule">
      <Translate contentKey="global.menu.entities.thirdPartyChargeDistributionSchedule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/time-limits">
      <Translate contentKey="global.menu.entities.timeLimits" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction-charge">
      <Translate contentKey="global.menu.entities.transactionCharge" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction-third-party">
      <Translate contentKey="global.menu.entities.transactionThirdParty" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/area">
      <Translate contentKey="global.menu.entities.area" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/area-file-types">
      <Translate contentKey="global.menu.entities.areaFileTypes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/country">
      <Translate contentKey="global.menu.entities.country" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/restricted-area">
      <Translate contentKey="global.menu.entities.restrictedArea" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application-role">
      <Translate contentKey="global.menu.entities.applicationRole" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application-user">
      <Translate contentKey="global.menu.entities.applicationUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/device">
      <Translate contentKey="global.menu.entities.device" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/fcm-tokens">
      <Translate contentKey="global.menu.entities.fcmTokens" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/code-generator">
      <Translate contentKey="global.menu.entities.codeGenerator" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/file-storage">
      <Translate contentKey="global.menu.entities.fileStorage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/sms-model">
      <Translate contentKey="global.menu.entities.smsModel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/review">
      <Translate contentKey="global.menu.entities.review" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/trip-management">
      <Translate contentKey="global.menu.entities.tripManagement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-make">
      <Translate contentKey="global.menu.entities.vehicleMake" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle">
      <Translate contentKey="global.menu.entities.vehicle" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-type">
      <Translate contentKey="global.menu.entities.vehicleType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-mapping">
      <Translate contentKey="global.menu.entities.vehicleMapping" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/otp">
      <Translate contentKey="global.menu.entities.otp" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/rating">
      <Translate contentKey="global.menu.entities.rating" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/identity-user">
      <Translate contentKey="global.menu.entities.identityUser" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-profile-file-types">
      <Translate contentKey="global.menu.entities.userProfileFileTypes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/passenger-identity">
      <Translate contentKey="global.menu.entities.passengerIdentity" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/complaints-category">
      <Translate contentKey="global.menu.entities.complaintsCategory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/complaints">
      <Translate contentKey="global.menu.entities.complaints" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/lost">
      <Translate contentKey="global.menu.entities.lost" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/found">
      <Translate contentKey="global.menu.entities.found" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/device-information">
      <Translate contentKey="global.menu.entities.deviceInformation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/vehicle-driver">
      <Translate contentKey="global.menu.entities.vehicleDriver" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver-location-update">
      <Translate contentKey="global.menu.entities.driverLocationUpdate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location-data">
      <Translate contentKey="global.menu.entities.locationData" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mongo-file-types">
      <Translate contentKey="global.menu.entities.mongoFileTypes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver">
      <Translate contentKey="global.menu.entities.driver" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/passenger">
      <Translate contentKey="global.menu.entities.passenger" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/passenger-location-update">
      <Translate contentKey="global.menu.entities.passengerLocationUpdate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/online-times">
      <Translate contentKey="global.menu.entities.onlineTimes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver-opened-app-times">
      <Translate contentKey="global.menu.entities.driverOpenedAppTimes" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/price-mongo-model">
      <Translate contentKey="global.menu.entities.priceMongoModel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/stops">
      <Translate contentKey="global.menu.entities.stops" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-location">
      <Translate contentKey="global.menu.entities.userLocation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/trip">
      <Translate contentKey="global.menu.entities.trip" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/trip-queue">
      <Translate contentKey="global.menu.entities.tripQueue" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
