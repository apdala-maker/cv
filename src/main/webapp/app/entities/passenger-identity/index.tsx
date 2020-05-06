import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PassengerIdentity from './passenger-identity';
import PassengerIdentityDetail from './passenger-identity-detail';
import PassengerIdentityUpdate from './passenger-identity-update';
import PassengerIdentityDeleteDialog from './passenger-identity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PassengerIdentityDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PassengerIdentityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PassengerIdentityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PassengerIdentityDetail} />
      <ErrorBoundaryRoute path={match.url} component={PassengerIdentity} />
    </Switch>
  </>
);

export default Routes;
