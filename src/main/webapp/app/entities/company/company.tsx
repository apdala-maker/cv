import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Company = (props: ICompanyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { companyList, match, loading } = props;
  return (
    <div>
      <h2 id="company-heading">
        <Translate contentKey="catchControlPanelApp.company.home.title">Companies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.company.home.createLabel">Create new Company</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {companyList && companyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.displayName">Display Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.legalOrTradingName">Legal Or Trading Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.registrationNumber">Registration Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.registrationDate">Registration Date</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.companyCode">Company Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.countyOrState">County Or State</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.postalAddress">Postal Address</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.cityOrTown">City Or Town</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.buildingNameOrNumber">Building Name Or Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.primaryPhoneNumber">Primary Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.secondaryPhoneNumber">Secondary Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.emailAddress">Email Address</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.website">Website</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.company.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${company.id}`} color="link" size="sm">
                      {company.id}
                    </Button>
                  </td>
                  <td>{company.displayName}</td>
                  <td>{company.legalOrTradingName}</td>
                  <td>{company.registrationNumber}</td>
                  <td>
                    <TextFormat type="date" value={company.registrationDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{company.companyCode}</td>
                  <td>{company.areaCode}</td>
                  <td>{company.countyOrState}</td>
                  <td>{company.postalCode}</td>
                  <td>{company.postalAddress}</td>
                  <td>{company.cityOrTown}</td>
                  <td>{company.street}</td>
                  <td>{company.buildingNameOrNumber}</td>
                  <td>{company.primaryPhoneNumber}</td>
                  <td>{company.secondaryPhoneNumber}</td>
                  <td>{company.emailAddress}</td>
                  <td>{company.website}</td>
                  <td>
                    <TextFormat type="date" value={company.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{company.createdBy}</td>
                  <td>{company.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={company.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{company.modifiedBy}</td>
                  <td>{company.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${company.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${company.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${company.id}/delete`} color="danger" size="sm">
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
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="catchControlPanelApp.company.home.notFound">No Companies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ company }: IRootState) => ({
  companyList: company.entities,
  loading: company.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Company);
