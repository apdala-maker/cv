import React from 'react';
import UserManagementMenu from 'app/shared/layout/menus/main-menu/users-management/user-services-menu';
import PassengerManagementMenu from 'app/shared/layout/menus/main-menu/passengers-menu/passenger-services-menu';
import DriverManagementMenu from 'app/shared/layout/menus/main-menu/drivers-menu/drivers-services-menu';
import VehicleManagementMenu from 'app/shared/layout/menus/main-menu/vehicle-setup-menu/vehicle-set-up-menu';
import CustomerCareManagementMenu
  from 'app/shared/layout/menus/main-menu/customer-care-services-menu/customer-service-menu';
import AreaManagementMenu from 'app/shared/layout/menus/main-menu/area-setup-menu/area-setup-menu';
import { connect } from 'react-redux';
import { Home } from 'app/modules/home/home';

export type ISideBarProp = StateProps;

export const SideBar = (props: ISideBarProp) => (
  <>
    <UserManagementMenu isAuthenticated={props.isAuthenticated}/>
    <DriverManagementMenu isAuthenticated={props.isAuthenticated}/>
    <PassengerManagementMenu isAuthenticated={props.isAuthenticated}/>
    <VehicleManagementMenu isAuthenticated={props.isAuthenticated}/>
    <AreaManagementMenu isAuthenticated={props.isAuthenticated}/>
    <CustomerCareManagementMenu isAuthenticated={props.isAuthenticated}/>
  </>
);

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(SideBar);
