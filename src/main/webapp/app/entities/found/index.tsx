import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Found from './found';
import FoundDetail from './found-detail';
import FoundUpdate from './found-update';
import FoundDeleteDialog from './found-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FoundDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FoundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FoundUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FoundDetail} />
      <ErrorBoundaryRoute path={match.url} component={Found} />
    </Switch>
  </>
);

export default Routes;
