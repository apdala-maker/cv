import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Lost from './lost';
import LostDetail from './lost-detail';
import LostUpdate from './lost-update';
import LostDeleteDialog from './lost-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LostDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LostUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LostUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LostDetail} />
      <ErrorBoundaryRoute path={match.url} component={Lost} />
    </Switch>
  </>
);

export default Routes;
