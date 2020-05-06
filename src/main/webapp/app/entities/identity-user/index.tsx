import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import IdentityUser from './identity-user';
import IdentityUserDetail from './identity-user-detail';
import IdentityUserUpdate from './identity-user-update';
import IdentityUserDeleteDialog from './identity-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IdentityUserDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IdentityUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IdentityUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IdentityUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={IdentityUser} />
    </Switch>
  </>
);

export default Routes;
