import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getUsers, updateUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const UserManagement = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
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
    props.updateUser({
      ...user,
      activated: !user.activated
    });
  const { users, account, match, totalItems } = props;
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
            <th className="hand p-0" onClick={sort('userCode')}>
              <Translate contentKey="global.field.userCode">User Code </Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand p-0" onClick={sort('name')}>
              <Translate contentKey="userManagement.name">Name</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand p-0" onClick={sort('email')}>
              <Translate contentKey="userManagement.email">Email</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th id="modified-date-sort" className="hand p-0" onClick={sort('areaCode')}>
              <Translate contentKey="userManagement.areaCode">Area Code</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.userCode} key={`user-${i}`}>
              <td className="p-0">
                <Button tag={Link} to={`${match.url}/${user.userCode}`} color="link" size="sm">
                  {user.userCode}
                </Button>
              </td>
              <td className="p-0">{user.name}</td>
              <td className="p-0">{user.email}</td>
              <td className="p-0">{user.areaCode}</td>
              <td className="text-right p-0">
                <div className="btn-group flex-btn-group-container p-0">
                  <Button  className=" cursor-pointer" tag={Link} to={`${match.url}/${user.userCode}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button className=" cursor-pointer" tag={Link} to={`${match.url}/${user.userCode}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button className=" cursor-pointer" tag={Link} to={`${match.url}/${user.userCode}/delete`} color="danger" size="sm"
                    disabled={account.userCode === user.userCode}>
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

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
