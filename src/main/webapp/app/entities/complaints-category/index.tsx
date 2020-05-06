import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ComplaintsCategory from './complaints-category';
import ComplaintsCategoryDetail from './complaints-category-detail';
import ComplaintsCategoryUpdate from './complaints-category-update';
import ComplaintsCategoryDeleteDialog from './complaints-category-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ComplaintsCategoryDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComplaintsCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComplaintsCategoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComplaintsCategoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={ComplaintsCategory} />
    </Switch>
  </>
);

export default Routes;
