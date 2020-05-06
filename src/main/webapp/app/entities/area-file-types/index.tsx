import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AreaFileTypes from './area-file-types';
import AreaFileTypesDetail from './area-file-types-detail';
import AreaFileTypesUpdate from './area-file-types-update';
import AreaFileTypesDeleteDialog from './area-file-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AreaFileTypesDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AreaFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AreaFileTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AreaFileTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={AreaFileTypes} />
    </Switch>
  </>
);

export default Routes;
