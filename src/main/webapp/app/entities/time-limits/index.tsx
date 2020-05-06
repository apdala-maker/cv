import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TimeLimits from './time-limits';
import TimeLimitsDetail from './time-limits-detail';
import TimeLimitsUpdate from './time-limits-update';
import TimeLimitsDeleteDialog from './time-limits-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TimeLimitsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimeLimitsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimeLimitsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimeLimitsDetail} />
      <ErrorBoundaryRoute path={match.url} component={TimeLimits} />
    </Switch>
  </>
);

export default Routes;
