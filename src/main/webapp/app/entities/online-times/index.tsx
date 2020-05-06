import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OnlineTimes from './online-times';
import OnlineTimesDetail from './online-times-detail';
import OnlineTimesUpdate from './online-times-update';
import OnlineTimesDeleteDialog from './online-times-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OnlineTimesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OnlineTimesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OnlineTimesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OnlineTimesDetail} />
      <ErrorBoundaryRoute path={match.url} component={OnlineTimes} />
    </Switch>
  </>
);

export default Routes;
