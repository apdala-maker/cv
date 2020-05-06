import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Complaints from './complaints';
import ComplaintsDetail from './complaints-detail';
import ComplaintsUpdate from './complaints-update';
import ComplaintsDeleteDialog from './complaints-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ComplaintsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComplaintsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComplaintsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComplaintsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Complaints} />
    </Switch>
  </>
);

export default Routes;
