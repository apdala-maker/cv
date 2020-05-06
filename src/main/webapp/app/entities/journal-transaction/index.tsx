import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JournalTransaction from './journal-transaction';
import JournalTransactionDetail from './journal-transaction-detail';
import JournalTransactionUpdate from './journal-transaction-update';
import JournalTransactionDeleteDialog from './journal-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JournalTransactionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JournalTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JournalTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JournalTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={JournalTransaction} />
    </Switch>
  </>
);

export default Routes;
