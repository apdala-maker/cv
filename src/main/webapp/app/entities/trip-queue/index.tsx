import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TripQueue from './trip-queue';
import TripQueueDetail from './trip-queue-detail';
import TripQueueUpdate from './trip-queue-update';
import TripQueueDeleteDialog from './trip-queue-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TripQueueDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TripQueueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TripQueueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TripQueueDetail} />
      <ErrorBoundaryRoute path={match.url} component={TripQueue} />
    </Switch>
  </>
);

export default Routes;
