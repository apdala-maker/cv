import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOnlineTimes, defaultValue } from 'app/shared/model/online-times.model';

export const ACTION_TYPES = {
  FETCH_ONLINETIMES_LIST: 'onlineTimes/FETCH_ONLINETIMES_LIST',
  FETCH_ONLINETIMES: 'onlineTimes/FETCH_ONLINETIMES',
  CREATE_ONLINETIMES: 'onlineTimes/CREATE_ONLINETIMES',
  UPDATE_ONLINETIMES: 'onlineTimes/UPDATE_ONLINETIMES',
  DELETE_ONLINETIMES: 'onlineTimes/DELETE_ONLINETIMES',
  RESET: 'onlineTimes/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOnlineTimes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OnlineTimesState = Readonly<typeof initialState>;

// Reducer

export default (state: OnlineTimesState = initialState, action): OnlineTimesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ONLINETIMES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ONLINETIMES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ONLINETIMES):
    case REQUEST(ACTION_TYPES.UPDATE_ONLINETIMES):
    case REQUEST(ACTION_TYPES.DELETE_ONLINETIMES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ONLINETIMES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ONLINETIMES):
    case FAILURE(ACTION_TYPES.CREATE_ONLINETIMES):
    case FAILURE(ACTION_TYPES.UPDATE_ONLINETIMES):
    case FAILURE(ACTION_TYPES.DELETE_ONLINETIMES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONLINETIMES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONLINETIMES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ONLINETIMES):
    case SUCCESS(ACTION_TYPES.UPDATE_ONLINETIMES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ONLINETIMES):
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

const apiUrl = 'api/online-times';

// Actions

export const getEntities: ICrudGetAllAction<IOnlineTimes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ONLINETIMES_LIST,
  payload: axios.get<IOnlineTimes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOnlineTimes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ONLINETIMES,
    payload: axios.get<IOnlineTimes>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOnlineTimes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ONLINETIMES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOnlineTimes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ONLINETIMES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOnlineTimes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ONLINETIMES,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
