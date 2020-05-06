import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerTransaction from './customer-transaction';
import CustomerTransactionDetail from './customer-transaction-detail';
import CustomerTransactionUpdate from './customer-transaction-update';
import CustomerTransactionDeleteDialog from './customer-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomerTransactionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerTransaction} />
    </Switch>
  </>
);

export default Routes;
