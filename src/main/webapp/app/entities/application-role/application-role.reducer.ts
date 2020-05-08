import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IApplicationRole, defaultValue } from 'app/shared/model/application-role.model';

export const ACTION_TYPES = {
  FETCH_APPLICATIONROLE_LIST: 'applicationRole/FETCH_APPLICATIONROLE_LIST',
  FETCH_ALLPOSSIBLEROLES: 'applicationRole/FETCH_ALLPOSSIBLEROLES',
  FETCH_APPLICATIONROLE: 'applicationRole/FETCH_APPLICATIONROLE',
  CREATE_APPLICATIONROLE: 'applicationRole/CREATE_APPLICATIONROLE',
  UPDATE_APPLICATIONROLE: 'applicationRole/UPDATE_APPLICATIONROLE',
  DELETE_APPLICATIONROLE: 'applicationRole/DELETE_APPLICATIONROLE',
  RESET: 'applicationRole/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  allRoles: [] as ReadonlyArray<IApplicationRole>,
  allPossibleRoles: [] as ReadonlyArray<IApplicationRole>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  allPossibleSuccess: false
};

export type ApplicationRoleState = Readonly<typeof initialState>;

// Reducer

export default (state: ApplicationRoleState = initialState, action): ApplicationRoleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONROLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APPLICATIONROLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_APPLICATIONROLE):
    case REQUEST(ACTION_TYPES.UPDATE_APPLICATIONROLE):
    case REQUEST(ACTION_TYPES.DELETE_APPLICATIONROLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ALLPOSSIBLEROLES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONROLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALLPOSSIBLEROLES):
    case FAILURE(ACTION_TYPES.FETCH_APPLICATIONROLE):
    case FAILURE(ACTION_TYPES.CREATE_APPLICATIONROLE):
    case FAILURE(ACTION_TYPES.UPDATE_APPLICATIONROLE):
    case FAILURE(ACTION_TYPES.DELETE_APPLICATIONROLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONROLE_LIST):
      return {
        ...state,
        loading: false,
        allRoles: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALLPOSSIBLEROLES):
      return {
        ...state,
        loading: false,
        allPossibleSuccess: true,
        allPossibleRoles: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_APPLICATIONROLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_APPLICATIONROLE):
    case SUCCESS(ACTION_TYPES.UPDATE_APPLICATIONROLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_APPLICATIONROLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const fetchUrl = 'api/v1/catch/get-all-created-roles';

// Actions

export const getCreatedRoles: ICrudGetAllAction<IApplicationRole> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APPLICATIONROLE_LIST,
  payload: axios.get<IApplicationRole>(`${fetchUrl}`)
});

const fetchAllPossibleRoles = '/api/v1/catch/auth/get-all-possible-roles';
export const getAllPossibleRoles: ICrudGetAllAction<IApplicationRole> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ALLPOSSIBLEROLES,
  payload: axios.get<IApplicationRole>(`${fetchAllPossibleRoles}`)
});
export const getEntity: ICrudGetAction<IApplicationRole> = id => {
  const requestUrl = `${fetchUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APPLICATIONROLE,
    payload: axios.get<IApplicationRole>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IApplicationRole> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APPLICATIONROLE,
    payload: axios.post(fetchUrl, cleanEntity(entity))
  });
  dispatch(getCreatedRoles());
  return result;
};

export const updateRole: ICrudPutAction<IApplicationRole> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APPLICATIONROLE,
    payload: axios.put(fetchUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IApplicationRole> = id => async dispatch => {
  const requestUrl = `${fetchUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APPLICATIONROLE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
