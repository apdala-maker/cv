import "../main-menu.scss";
import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Dropdown ,DropdownToggle,DropdownMenu} from 'reactstrap';
import { Translate } from 'react-jhipster';

const vehicleMenuAuthenticated = (
  <DropdownMenu>
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </DropdownMenu>
);

const vehicleMenuNotAuthenticated = (
  <DropdownMenu>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">Please login to continue</MenuItem>
  </DropdownMenu>
);

export const VehicleManagementMenu = ({ isAuthenticated = true }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return(
    <Dropdown isOpen={dropdownOpen} size="sm" className="drop-down-container" direction="right" toggle={()=>setDropdownOpen(!dropdownOpen)}>
      <DropdownToggle className={dropdownOpen?`sidebar-menu opened`:`sidebar-menu`} caret><span className="float-left">Vehicle Management</span></DropdownToggle>
      {isAuthenticated ? vehicleMenuAuthenticated : vehicleMenuNotAuthenticated}
    </Dropdown>
  );
}
export default VehicleManagementMenu;
