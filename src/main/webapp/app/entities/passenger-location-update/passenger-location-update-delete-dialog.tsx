import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPassengerLocationUpdate } from 'app/shared/model/passenger-location-update.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './passenger-location-update.reducer';

export interface IPassengerLocationUpdateDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PassengerLocationUpdateDeleteDialog = (props: IPassengerLocationUpdateDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/passenger-location-update');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.passengerLocationUpdateEntity.id);
  };

  const { passengerLocationUpdateEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.passengerLocationUpdate.delete.question">
        <Translate
          contentKey="catchControlPanelApp.passengerLocationUpdate.delete.question"
          interpolate={{ id: passengerLocationUpdateEntity.id }}
        >
          Are you sure you want to delete this PassengerLocationUpdate?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-passengerLocationUpdate" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ passengerLocationUpdate }: IRootState) => ({
  passengerLocationUpdateEntity: passengerLocationUpdate.entity,
  updateSuccess: passengerLocationUpdate.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PassengerLocationUpdateDeleteDialog);
