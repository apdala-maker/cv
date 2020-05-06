import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleDriver, defaultValue } from 'app/shared/model/vehicle-driver.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEDRIVER_LIST: 'vehicleDriver/FETCH_VEHICLEDRIVER_LIST',
  FETCH_VEHICLEDRIVER: 'vehicleDriver/FETCH_VEHICLEDRIVER',
  CREATE_VEHICLEDRIVER: 'vehicleDriver/CREATE_VEHICLEDRIVER',
  UPDATE_VEHICLEDRIVER: 'vehicleDriver/UPDATE_VEHICLEDRIVER',
  DELETE_VEHICLEDRIVER: 'vehicleDriver/DELETE_VEHICLEDRIVER',
  RESET: 'vehicleDriver/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleDriver>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type VehicleDriverState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleDriverState = initialState, action): VehicleDriverState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEDRIVER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEDRIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEDRIVER):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEDRIVER):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEDRIVER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEDRIVER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEDRIVER):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEDRIVER):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEDRIVER):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEDRIVER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEDRIVER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEDRIVER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEDRIVER):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEDRIVER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEDRIVER):
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

const apiUrl = 'api/vehicle-drivers';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleDriver> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEDRIVER_LIST,
  payload: axios.get<IVehicleDriver>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IVehicleDriver> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEDRIVER,
    payload: axios.get<IVehicleDriver>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicleDriver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEDRIVER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleDriver> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEDRIVER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleDriver> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEDRIVER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
