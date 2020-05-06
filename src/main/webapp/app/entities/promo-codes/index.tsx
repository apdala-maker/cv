import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PromoCodes from './promo-codes';
import PromoCodesDetail from './promo-codes-detail';
import PromoCodesUpdate from './promo-codes-update';
import PromoCodesDeleteDialog from './promo-codes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PromoCodesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PromoCodesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PromoCodesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PromoCodesDetail} />
      <ErrorBoundaryRoute path={match.url} component={PromoCodes} />
    </Switch>
  </>
);

export default Routes;
