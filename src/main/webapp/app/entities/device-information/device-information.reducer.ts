import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDeviceInformation, defaultValue } from 'app/shared/model/device-information.model';

export const ACTION_TYPES = {
  FETCH_DEVICEINFORMATION_LIST: 'deviceInformation/FETCH_DEVICEINFORMATION_LIST',
  FETCH_DEVICEINFORMATION: 'deviceInformation/FETCH_DEVICEINFORMATION',
  CREATE_DEVICEINFORMATION: 'deviceInformation/CREATE_DEVICEINFORMATION',
  UPDATE_DEVICEINFORMATION: 'deviceInformation/UPDATE_DEVICEINFORMATION',
  DELETE_DEVICEINFORMATION: 'deviceInformation/DELETE_DEVICEINFORMATION',
  RESET: 'deviceInformation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDeviceInformation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DeviceInformationState = Readonly<typeof initialState>;

// Reducer

export default (state: DeviceInformationState = initialState, action): DeviceInformationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEVICEINFORMATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEVICEINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEVICEINFORMATION):
    case REQUEST(ACTION_TYPES.UPDATE_DEVICEINFORMATION):
    case REQUEST(ACTION_TYPES.DELETE_DEVICEINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DEVICEINFORMATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEVICEINFORMATION):
    case FAILURE(ACTION_TYPES.CREATE_DEVICEINFORMATION):
    case FAILURE(ACTION_TYPES.UPDATE_DEVICEINFORMATION):
    case FAILURE(ACTION_TYPES.DELETE_DEVICEINFORMATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICEINFORMATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEVICEINFORMATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEVICEINFORMATION):
    case SUCCESS(ACTION_TYPES.UPDATE_DEVICEINFORMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEVICEINFORMATION):
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

const apiUrl = 'api/device-informations';

// Actions

export const getEntities: ICrudGetAllAction<IDeviceInformation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEVICEINFORMATION_LIST,
  payload: axios.get<IDeviceInformation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDeviceInformation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEVICEINFORMATION,
    payload: axios.get<IDeviceInformation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDeviceInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEVICEINFORMATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDeviceInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEVICEINFORMATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDeviceInformation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEVICEINFORMATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
