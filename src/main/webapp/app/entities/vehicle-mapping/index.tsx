import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VehicleMapping from './vehicle-mapping';
import VehicleMappingDetail from './vehicle-mapping-detail';
import VehicleMappingUpdate from './vehicle-mapping-update';
import VehicleMappingDeleteDialog from './vehicle-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VehicleMappingDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VehicleMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={VehicleMapping} />
    </Switch>
  </>
);

export default Routes;
