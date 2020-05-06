import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transaction-third-party.reducer';
import { ITransactionThirdParty } from 'app/shared/model/transaction-third-party.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionThirdPartyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TransactionThirdParty = (props: ITransactionThirdPartyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { transactionThirdPartyList, match, loading } = props;
  return (
    <div>
      <h2 id="transaction-third-party-heading">
        <Translate contentKey="catchControlPanelApp.transactionThirdParty.home.title">Transaction Third Parties</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="catchControlPanelApp.transactionThirdParty.home.createLabel">Create new Transaction Third Party</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {transactionThirdPartyList && transactionThirdPartyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.areaCode">Area Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.partyCategory">Party Category</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.country">Country</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.countyOrState">County Or State</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.postalAddress">Postal Address</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.town">Town</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.street">Street</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.buildingNameOrNumber">
                    Building Name Or Number
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.primaryPhoneNumber">Primary Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.secondayPhoneNumber">Seconday Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.emailAddress">Email Address</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateCreated">Date Created</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.createdBy">Created By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.creatorUserEmail">Creator User Email</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.dateModified">Date Modified</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifiedBy">Modified By</Translate>
                </th>
                <th>
                  <Translate contentKey="catchControlPanelApp.transactionThirdParty.modifierUserEmail">Modifier User Email</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactionThirdPartyList.map((transactionThirdParty, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${transactionThirdParty.id}`} color="link" size="sm">
                      {transactionThirdParty.id}
                    </Button>
                  </td>
                  <td>{transactionThirdParty.areaCode}</td>
                  <td>
                    <Translate contentKey={`catchControlPanelApp.PartyCategory.${transactionThirdParty.partyCategory}`} />
                  </td>
                  <td>{transactionThirdParty.code}</td>
                  <td>{transactionThirdParty.name}</td>
                  <td>{transactionThirdParty.country}</td>
                  <td>{transactionThirdParty.countyOrState}</td>
                  <td>{transactionThirdParty.postalCode}</td>
                  <td>{transactionThirdParty.postalAddress}</td>
                  <td>{transactionThirdParty.town}</td>
                  <td>{transactionThirdParty.street}</td>
                  <td>{transactionThirdParty.buildingNameOrNumber}</td>
                  <td>{transactionThirdParty.primaryPhoneNumber}</td>
                  <td>{transactionThirdParty.secondayPhoneNumber}</td>
                  <td>{transactionThirdParty.emailAddress}</td>
                  <td>
                    <TextFormat type="date" value={transactionThirdParty.dateCreated} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{transactionThirdParty.createdBy}</td>
                  <td>{transactionThirdParty.creatorUserEmail}</td>
                  <td>
                    <TextFormat type="date" value={transactionThirdParty.dateModified} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{transactionThirdParty.modifiedBy}</td>
                  <td>{transactionThirdParty.modifierUserEmail}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${transactionThirdParty.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionThirdParty.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transactionThirdParty.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="catchControlPanelApp.transactionThirdParty.home.notFound">
                No Transaction Third Parties found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ transactionThirdParty }: IRootState) => ({
  transactionThirdPartyList: transactionThirdParty.entities,
  loading: transactionThirdParty.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionThirdParty);
