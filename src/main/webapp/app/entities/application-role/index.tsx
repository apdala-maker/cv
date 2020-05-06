import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApplicationRole from './application-role';
import ApplicationRoleDetail from './application-role-detail';
import ApplicationRoleUpdate from './application-role-update';
import ApplicationRoleDeleteDialog from './application-role-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApplicationRoleDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApplicationRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApplicationRoleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApplicationRoleDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApplicationRole} />
    </Switch>
  </>
);

export default Routes;
