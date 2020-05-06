import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransactionCharge from './transaction-charge';
import TransactionChargeDetail from './transaction-charge-detail';
import TransactionChargeUpdate from './transaction-charge-update';
import TransactionChargeDeleteDialog from './transaction-charge-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionChargeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionChargeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionChargeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionChargeDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransactionCharge} />
    </Switch>
  </>
);

export default Routes;
