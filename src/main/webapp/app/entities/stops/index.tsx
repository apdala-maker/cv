import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Stops from './stops';
import StopsDetail from './stops-detail';
import StopsUpdate from './stops-update';
import StopsDeleteDialog from './stops-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={StopsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StopsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StopsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StopsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Stops} />
    </Switch>
  </>
);

export default Routes;
