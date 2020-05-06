import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMapping, defaultValue } from 'app/shared/model/vehicle-mapping.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMAPPING_LIST: 'vehicleMapping/FETCH_VEHICLEMAPPING_LIST',
  FETCH_VEHICLEMAPPING: 'vehicleMapping/FETCH_VEHICLEMAPPING',
  CREATE_VEHICLEMAPPING: 'vehicleMapping/CREATE_VEHICLEMAPPING',
  UPDATE_VEHICLEMAPPING: 'vehicleMapping/UPDATE_VEHICLEMAPPING',
  DELETE_VEHICLEMAPPING: 'vehicleMapping/DELETE_VEHICLEMAPPING',
  RESET: 'vehicleMapping/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMapping>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type VehicleMappingState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMappingState = initialState, action): VehicleMappingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMAPPING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMAPPING):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMAPPING):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMAPPING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMAPPING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMAPPING):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMAPPING):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMAPPING):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMAPPING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMAPPING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMAPPING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMAPPING):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMAPPING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMAPPING):
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

const apiUrl = 'api/vehicle-mappings';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMapping> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMAPPING_LIST,
  payload: axios.get<IVehicleMapping>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IVehicleMapping> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMAPPING,
    payload: axios.get<IVehicleMapping>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IVehicleMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMAPPING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMapping> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMAPPING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMapping> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMAPPING,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
