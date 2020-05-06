import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DriverLocationUpdate from './driver-location-update';
import DriverLocationUpdateDetail from './driver-location-update-detail';
import DriverLocationUpdateUpdate from './driver-location-update-update';
import DriverLocationUpdateDeleteDialog from './driver-location-update-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DriverLocationUpdateDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DriverLocationUpdateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DriverLocationUpdateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DriverLocationUpdateDetail} />
      <ErrorBoundaryRoute path={match.url} component={DriverLocationUpdate} />
    </Switch>
  </>
);

export default Routes;
