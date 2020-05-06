import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PassengerLocationUpdate from './passenger-location-update';
import PassengerLocationUpdateDetail from './passenger-location-update-detail';
import PassengerLocationUpdateUpdate from './passenger-location-update-update';
import PassengerLocationUpdateDeleteDialog from './passenger-location-update-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PassengerLocationUpdateDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PassengerLocationUpdateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PassengerLocationUpdateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PassengerLocationUpdateDetail} />
      <ErrorBoundaryRoute path={match.url} component={PassengerLocationUpdate} />
    </Switch>
  </>
);

export default Routes;
