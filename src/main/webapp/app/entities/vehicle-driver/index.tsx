import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleDriver from './vehicle-driver';
import VehicleDriverDetail from './vehicle-driver-detail';
import VehicleDriverUpdate from './vehicle-driver-update';
import VehicleDriverDeleteDialog from './vehicle-driver-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleDriverDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleDriverUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleDriverUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleDriverDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleDriver} />
    </Switch>
  </>
);

export default Routes;
