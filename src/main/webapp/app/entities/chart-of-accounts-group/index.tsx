import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChartOfAccountsGroup from './chart-of-accounts-group';
import ChartOfAccountsGroupDetail from './chart-of-accounts-group-detail';
import ChartOfAccountsGroupUpdate from './chart-of-accounts-group-update';
import ChartOfAccountsGroupDeleteDialog from './chart-of-accounts-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChartOfAccountsGroupDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChartOfAccountsGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChartOfAccountsGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChartOfAccountsGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChartOfAccountsGroup} />
    </Switch>
  </>
);

export default Routes;
