import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MongoFileTypes from './mongo-file-types';
import MongoFileTypesDetail from './mongo-file-types-detail';
import MongoFileTypesUpdate from './mongo-file-types-update';
import MongoFileTypesDeleteDialog from './mongo-file-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MongoFileTypesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MongoFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MongoFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MongoFileTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={MongoFileTypes} />
    </Switch>
  </>
);

export default Routes;
