import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IChartOfAccountsGroup } from 'app/shared/model/chart-of-accounts-group.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './chart-of-accounts-group.reducer';

export interface IChartOfAccountsGroupDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChartOfAccountsGroupDeleteDialog = (props: IChartOfAccountsGroupDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/chart-of-accounts-group');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.chartOfAccountsGroupEntity.id);
  };

  const { chartOfAccountsGroupEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.chartOfAccountsGroup.delete.question">
        <Translate
          contentKey="catchControlPanelApp.chartOfAccountsGroup.delete.question"
          interpolate={{ id: chartOfAccountsGroupEntity.id }}
        >
          Are you sure you want to delete this ChartOfAccountsGroup?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-chartOfAccountsGroup" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ chartOfAccountsGroup }: IRootState) => ({
  chartOfAccountsGroupEntity: chartOfAccountsGroup.entity,
  updateSuccess: chartOfAccountsGroup.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountsGroupDeleteDialog);
