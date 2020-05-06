import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RestrictedArea from './restricted-area';
import RestrictedAreaDetail from './restricted-area-detail';
import RestrictedAreaUpdate from './restricted-area-update';
import RestrictedAreaDeleteDialog from './restricted-area-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RestrictedAreaDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RestrictedAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RestrictedAreaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RestrictedAreaDetail} />
      <ErrorBoundaryRoute path={match.url} component={RestrictedArea} />
    </Switch>
  </>
);

export default Routes;
