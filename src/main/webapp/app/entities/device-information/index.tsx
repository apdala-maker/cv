import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DeviceInformation from './device-information';
import DeviceInformationDetail from './device-information-detail';
import DeviceInformationUpdate from './device-information-update';
import DeviceInformationDeleteDialog from './device-information-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DeviceInformationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DeviceInformationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DeviceInformationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DeviceInformationDetail} />
      <ErrorBoundaryRoute path={match.url} component={DeviceInformation} />
    </Switch>
  </>
);

export default Routes;
