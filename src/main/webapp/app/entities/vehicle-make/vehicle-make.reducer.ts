import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMake, defaultValue } from 'app/shared/model/vehicle-make.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMAKE_LIST: 'vehicleMake/FETCH_VEHICLEMAKE_LIST',
  FETCH_VEHICLEMAKE: 'vehicleMake/FETCH_VEHICLEMAKE',
  CREATE_VEHICLEMAKE: 'vehicleMake/CREATE_VEHICLEMAKE',
  UPDATE_VEHICLEMAKE: 'vehicleMake/UPDATE_VEHICLEMAKE',
  DELETE_VEHICLEMAKE: 'vehicleMake/DELETE_VEHICLEMAKE',
  RESET: 'vehicleMake/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMake>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type VehicleMakeState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMakeState = initialState, action): VehicleMakeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMAKE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMAKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMAKE):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMAKE):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMAKE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMAKE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMAKE):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMAKE):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMAKE):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMAKE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMAKE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMAKE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMAKE):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMAKE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMAKE):
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

const apiUrl = 'api/vehicle-makes';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMake> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMAKE_LIST,
  payload: axios.get<IVehicleMake>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IVehicleMake> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMAKE,
    payload: axios.get<IVehicleMake>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicleMake> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMAKE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMake> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMAKE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMake> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMAKE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
