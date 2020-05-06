import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ChartOfAccounts from './chart-of-accounts';
import ChartOfAccountsDetail from './chart-of-accounts-detail';
import ChartOfAccountsUpdate from './chart-of-accounts-update';
import ChartOfAccountsDeleteDialog from './chart-of-accounts-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChartOfAccountsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChartOfAccountsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChartOfAccountsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChartOfAccountsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ChartOfAccounts} />
    </Switch>
  </>
);

export default Routes;
