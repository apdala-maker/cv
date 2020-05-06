import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriverOpenedAppTimes, defaultValue } from 'app/shared/model/driver-opened-app-times.model';

export const ACTION_TYPES = {
  FETCH_DRIVEROPENEDAPPTIMES_LIST: 'driverOpenedAppTimes/FETCH_DRIVEROPENEDAPPTIMES_LIST',
  FETCH_DRIVEROPENEDAPPTIMES: 'driverOpenedAppTimes/FETCH_DRIVEROPENEDAPPTIMES',
  CREATE_DRIVEROPENEDAPPTIMES: 'driverOpenedAppTimes/CREATE_DRIVEROPENEDAPPTIMES',
  UPDATE_DRIVEROPENEDAPPTIMES: 'driverOpenedAppTimes/UPDATE_DRIVEROPENEDAPPTIMES',
  DELETE_DRIVEROPENEDAPPTIMES: 'driverOpenedAppTimes/DELETE_DRIVEROPENEDAPPTIMES',
  RESET: 'driverOpenedAppTimes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriverOpenedAppTimes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DriverOpenedAppTimesState = Readonly<typeof initialState>;

// Reducer

export default (state: DriverOpenedAppTimesState = initialState, action): DriverOpenedAppTimesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVEROPENEDAPPTIMES):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVEROPENEDAPPTIMES):
    case REQUEST(ACTION_TYPES.DELETE_DRIVEROPENEDAPPTIMES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES):
    case FAILURE(ACTION_TYPES.CREATE_DRIVEROPENEDAPPTIMES):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVEROPENEDAPPTIMES):
    case FAILURE(ACTION_TYPES.DELETE_DRIVEROPENEDAPPTIMES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVEROPENEDAPPTIMES):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVEROPENEDAPPTIMES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVEROPENEDAPPTIMES):
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

const apiUrl = 'api/driver-opened-app-times';

// Actions

export const getEntities: ICrudGetAllAction<IDriverOpenedAppTimes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES_LIST,
  payload: axios.get<IDriverOpenedAppTimes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDriverOpenedAppTimes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVEROPENEDAPPTIMES,
    payload: axios.get<IDriverOpenedAppTimes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDriverOpenedAppTimes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVEROPENEDAPPTIMES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriverOpenedAppTimes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVEROPENEDAPPTIMES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriverOpenedAppTimes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVEROPENEDAPPTIMES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
