import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DriverOpenedAppTimes from './driver-opened-app-times';
import DriverOpenedAppTimesDetail from './driver-opened-app-times-detail';
import DriverOpenedAppTimesUpdate from './driver-opened-app-times-update';
import DriverOpenedAppTimesDeleteDialog from './driver-opened-app-times-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DriverOpenedAppTimesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DriverOpenedAppTimesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DriverOpenedAppTimesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DriverOpenedAppTimesDetail} />
      <ErrorBoundaryRoute path={match.url} component={DriverOpenedAppTimes} />
    </Switch>
  </>
);

export default Routes;
