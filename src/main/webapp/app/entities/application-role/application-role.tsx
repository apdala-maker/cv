import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getCreatedRoles,updateRole } from './application-role.reducer';
import { IApplicationRole } from 'app/shared/model/application-role.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IApplicationRoleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApplicationRole = (props: IApplicationRoleProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    props.getCreatedRoles(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });
  const editUser=(user)=>{

  }
  const toggleActive = user => () =>
    props.updateRole({
      ...user,
      activated: !user.activated
    });
  const { rolesList,  match } = props;
  return (
    <div className="bg-white p-2">
      <h2 id="user-management-page-heading p-0">
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <Link to={`${match.url}/new`} className="btn cursor-pointer btn-primary cursor-pointer float-right jh-create-entity p-0">
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
        </Link>
      </h2>
      <Table responsive striped className="table table-responsive-sm">
        <thead>
        <tr>
          <th className="hand p-0" onClick={sort('id')}>
            <Translate contentKey="catchControlPanelApp.applicationRole.id">ID </Translate>
            <FontAwesomeIcon icon="sort" />
          </th>
          <th className="hand p-0" onClick={sort('roleName')}>
            <Translate contentKey="catchControlPanelApp.applicationRole.name">Role Name</Translate>
            <FontAwesomeIcon icon="sort" />
          </th>
          <th />
          <th />
          <th />
        </tr>
        </thead>
        <tbody>
        {rolesList.map((role, i) => (
          <tr id={role.id} key={`user-${i}`}>
            <td className="p-0">
              <Button tag={Link} to={`${match.url}/${role.id}`} color="link" size="sm">
                {role.id}
              </Button>
            </td>
            <td className="p-0">{role.name}</td>
            <td className="text-right p-0">
              <div className="btn-group flex-btn-group-container p-0">
                <Button  className=" cursor-pointer" tag={Link} to={`${match.url}/${role.id}`} color="info" size="sm">
                  <FontAwesomeIcon icon="eye" />{' '}
                  <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                </Button>
                <Button className=" cursor-pointer" tag={Link} to={`${match.url}/${role.id}/edit`} color="primary" size="sm">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                </Button>
                <Button className=" cursor-pointer" tag={Link} to={`${match.url}/${role.id}/delete`} color="danger" size="sm"
                        disabled={role.id === role.id}>
                  <FontAwesomeIcon icon="trash" />{' '}
                  <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
                </Button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      {/* <div className={users && users.length > 0 ? '' : 'd-none'}>*/}
      {/*  <Row className="justify-content-center">*/}
      {/*    <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />*/}
      {/*  </Row>*/}
      {/*  <Row className="justify-content-center">*/}
      {/*    <JhiPagination*/}
      {/*      activePage={pagination.activePage}*/}
      {/*      onSelect={handlePagination}*/}
      {/*      maxButtons={5}*/}
      {/*      itemsPerPage={pagination.itemsPerPage}*/}
      {/*      totalItems={props.totalItems}*/}
      {/*    />*/}
      {/*  </Row>*/}
      {/* </div>*/}
    </div>
  );
};

const mapStateToProps = ({ applicationRole }: IRootState) => ({
  rolesList: applicationRole.allRoles,
  loading: applicationRole.loading
});

const mapDispatchToProps = {
  getCreatedRoles,updateRole
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRole);
