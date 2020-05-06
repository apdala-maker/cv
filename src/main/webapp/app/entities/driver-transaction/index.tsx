import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DriverTransaction from './driver-transaction';
import DriverTransactionDetail from './driver-transaction-detail';
import DriverTransactionUpdate from './driver-transaction-update';
import DriverTransactionDeleteDialog from './driver-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DriverTransactionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DriverTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DriverTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DriverTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={DriverTransaction} />
    </Switch>
  </>
);

export default Routes;
