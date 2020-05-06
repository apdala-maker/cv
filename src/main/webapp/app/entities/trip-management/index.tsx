import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TripManagement from './trip-management';
import TripManagementDetail from './trip-management-detail';
import TripManagementUpdate from './trip-management-update';
import TripManagementDeleteDialog from './trip-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TripManagementDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TripManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TripManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TripManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={TripManagement} />
    </Switch>
  </>
);

export default Routes;
