import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PromoCodeTransaction from './promo-code-transaction';
import PromoCodeTransactionDetail from './promo-code-transaction-detail';
import PromoCodeTransactionUpdate from './promo-code-transaction-update';
import PromoCodeTransactionDeleteDialog from './promo-code-transaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PromoCodeTransactionDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PromoCodeTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PromoCodeTransactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PromoCodeTransactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={PromoCodeTransaction} />
    </Switch>
  </>
);

export default Routes;
