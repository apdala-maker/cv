import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransactionThirdParty from './transaction-third-party';
import TransactionThirdPartyDetail from './transaction-third-party-detail';
import TransactionThirdPartyUpdate from './transaction-third-party-update';
import TransactionThirdPartyDeleteDialog from './transaction-third-party-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionThirdPartyDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionThirdPartyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionThirdPartyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionThirdPartyDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransactionThirdParty} />
    </Switch>
  </>
);

export default Routes;
