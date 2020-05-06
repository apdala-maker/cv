import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PriceMongoModel from './price-mongo-model';
import PriceMongoModelDetail from './price-mongo-model-detail';
import PriceMongoModelUpdate from './price-mongo-model-update';
import PriceMongoModelDeleteDialog from './price-mongo-model-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PriceMongoModelDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PriceMongoModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PriceMongoModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PriceMongoModelDetail} />
      <ErrorBoundaryRoute path={match.url} component={PriceMongoModel} />
    </Switch>
  </>
);

export default Routes;
