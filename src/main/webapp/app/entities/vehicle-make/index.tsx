import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMake from './vehicle-make';
import VehicleMakeDetail from './vehicle-make-detail';
import VehicleMakeUpdate from './vehicle-make-update';
import VehicleMakeDeleteDialog from './vehicle-make-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMakeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMakeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMakeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMakeDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMake} />
    </Switch>
  </>
);

export default Routes;
