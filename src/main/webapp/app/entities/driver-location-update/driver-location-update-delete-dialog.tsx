import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDriverLocationUpdate } from 'app/shared/model/driver-location-update.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './driver-location-update.reducer';

export interface IDriverLocationUpdateDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLocationUpdateDeleteDialog = (props: IDriverLocationUpdateDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/driver-location-update');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.driverLocationUpdateEntity.id);
  };

  const { driverLocationUpdateEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="catchControlPanelApp.driverLocationUpdate.delete.question">
        <Translate
          contentKey="catchControlPanelApp.driverLocationUpdate.delete.question"
          interpolate={{ id: driverLocationUpdateEntity.id }}
        >
          Are you sure you want to delete this DriverLocationUpdate?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-driverLocationUpdate" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ driverLocationUpdate }: IRootState) => ({
  driverLocationUpdateEntity: driverLocationUpdate.entity,
  updateSuccess: driverLocationUpdate.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLocationUpdateDeleteDialog);
