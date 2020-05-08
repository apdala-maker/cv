import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateRole, createEntity, getAllPossibleRoles,reset } from './application-role.reducer';
import { IApplicationRole } from 'app/shared/model/application-role.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationRoleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export const ApplicationRoleUpdate = (props: IApplicationRoleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [selectedRoles, setSelectedRoles]=useState([]);
  const [selectedActions, setAction]=useState([]);
  const [selectedRole, setRole]=useState("");


  const { applicationRoleEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application-role');
  };

  useEffect(() => {
    props.getAllPossibleRoles();

    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);
  useEffect(()=>{
    if (props.allPossibleSuccess){
      // eslint-disable-next-line no-console
      console.log("Here we are", props.allPossibleRoles);
    }
  },[])
  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const toggleShowBtn = (e, roleId) => {
    if (selectedRole === roleId) {
      setRole("");
    } else {
      setRole(roleId)
    }
  };
  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicationRoleEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateRole(entity);
      }
    }
  };

  return (
    <div className="bg-white col-md-8 p-2 m-auto">
      <Row className="justify-content-center">
        <Col md="8">
          <Row className="justify-content-center">
            <Col md="12">
              <h2 id="catchControlPanelApp.applicationRole.home.createOrEditLabel">
                <Translate contentKey="catchControlPanelApp.applicationRole.home.createOrEditLabel">Create or edit a ApplicationRole</Translate>
              </h2>
            </Col>
          </Row>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationRoleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-role-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-role-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="roleName" for="application-role-access">
                  <Translate contentKey="catchControlPanelApp.applicationRole.name">Role Name</Translate>
                </Label>
                <AvField id="application-role-access" type="text" name="roleName" />
              </AvGroup>
              <div className="row col-md-12 m-auto pt-sm--2 ">
                <label className="col-md-12  roles-label">Controllers</label>
                {props.allPossibleRoles.map((role, key) => {
                  // return the main list of roles
                  return (<div key={key} className="col-sm-12 m-auto">
                    <div className="d-flex bg-light p-1">
                      <div className="p-1 ">
                        <input type="checkbox" key={key} className="custom-checkbox" name={role.name} id={role.name}/>
                      </div>
                      <div className="p-1"><p className="ml-lg-1">{role.name} Roles</p>
                      </div>
                      <div className="p-1 ml-auto ">
                        <span onClick={(e) => toggleShowBtn(e, role.id)}
                              className="btn btn-primary text-sm-left bold-text text-white p-0">
                          <i className="fa fa-eye"/>View Actions </span></div>
                    </div>
                    <ul className="list-group p-0 d-flex justify-content-between " id={role.id}>
                      {role.actions.map((selectedAction, innerKey) => {
                        return (
                          <div key={innerKey} className=" list-group-item" style={{display: selectedRole === role.id ? "block" : "none"}}>
                            <div className="p-0">
                              <input type="checkbox" key={innerKey} className="custom-checkbox-inner p-0" id={selectedAction.name}
                                name={selectedAction.name}/><span className="pl-lg-2 ">{selectedAction.displayName}</span>
                            </div>
                          </div>)
                      })}
                    </ul>
                  </div>)
                })}
              </div>
              <Button tag={Link} id="cancel-save" to="/application-role" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  applicationRoleEntity: storeState.applicationRole.entity,
  allPossibleRoles: storeState.applicationRole.allPossibleRoles,
  loading: storeState.applicationRole.loading,
  updating: storeState.applicationRole.updating,
  allPossibleSuccess: storeState.applicationRole.allPossibleSuccess,
  updateSuccess: storeState.applicationRole.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateRole,
  createEntity,
  getAllPossibleRoles,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoleUpdate);
