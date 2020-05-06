import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriverLocationUpdate, defaultValue } from 'app/shared/model/driver-location-update.model';

export const ACTION_TYPES = {
  FETCH_DRIVERLOCATIONUPDATE_LIST: 'driverLocationUpdate/FETCH_DRIVERLOCATIONUPDATE_LIST',
  FETCH_DRIVERLOCATIONUPDATE: 'driverLocationUpdate/FETCH_DRIVERLOCATIONUPDATE',
  CREATE_DRIVERLOCATIONUPDATE: 'driverLocationUpdate/CREATE_DRIVERLOCATIONUPDATE',
  UPDATE_DRIVERLOCATIONUPDATE: 'driverLocationUpdate/UPDATE_DRIVERLOCATIONUPDATE',
  DELETE_DRIVERLOCATIONUPDATE: 'driverLocationUpdate/DELETE_DRIVERLOCATIONUPDATE',
  RESET: 'driverLocationUpdate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriverLocationUpdate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DriverLocationUpdateState = Readonly<typeof initialState>;

// Reducer

export default (state: DriverLocationUpdateState = initialState, action): DriverLocationUpdateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVERLOCATIONUPDATE):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVERLOCATIONUPDATE):
    case REQUEST(ACTION_TYPES.DELETE_DRIVERLOCATIONUPDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.CREATE_DRIVERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVERLOCATIONUPDATE):
    case FAILURE(ACTION_TYPES.DELETE_DRIVERLOCATIONUPDATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVERLOCATIONUPDATE):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVERLOCATIONUPDATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVERLOCATIONUPDATE):
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

const apiUrl = 'api/driver-location-updates';

// Actions

export const getEntities: ICrudGetAllAction<IDriverLocationUpdate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE_LIST,
  payload: axios.get<IDriverLocationUpdate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDriverLocationUpdate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVERLOCATIONUPDATE,
    payload: axios.get<IDriverLocationUpdate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDriverLocationUpdate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVERLOCATIONUPDATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriverLocationUpdate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVERLOCATIONUPDATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriverLocationUpdate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVERLOCATIONUPDATE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
