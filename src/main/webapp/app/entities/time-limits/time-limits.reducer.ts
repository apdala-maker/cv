import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITimeLimits, defaultValue } from 'app/shared/model/time-limits.model';

export const ACTION_TYPES = {
  FETCH_TIMELIMITS_LIST: 'timeLimits/FETCH_TIMELIMITS_LIST',
  FETCH_TIMELIMITS: 'timeLimits/FETCH_TIMELIMITS',
  CREATE_TIMELIMITS: 'timeLimits/CREATE_TIMELIMITS',
  UPDATE_TIMELIMITS: 'timeLimits/UPDATE_TIMELIMITS',
  DELETE_TIMELIMITS: 'timeLimits/DELETE_TIMELIMITS',
  RESET: 'timeLimits/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITimeLimits>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TimeLimitsState = Readonly<typeof initialState>;

// Reducer

export default (state: TimeLimitsState = initialState, action): TimeLimitsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIMELIMITS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIMELIMITS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TIMELIMITS):
    case REQUEST(ACTION_TYPES.UPDATE_TIMELIMITS):
    case REQUEST(ACTION_TYPES.DELETE_TIMELIMITS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TIMELIMITS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIMELIMITS):
    case FAILURE(ACTION_TYPES.CREATE_TIMELIMITS):
    case FAILURE(ACTION_TYPES.UPDATE_TIMELIMITS):
    case FAILURE(ACTION_TYPES.DELETE_TIMELIMITS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMELIMITS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIMELIMITS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIMELIMITS):
    case SUCCESS(ACTION_TYPES.UPDATE_TIMELIMITS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIMELIMITS):
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

const apiUrl = 'api/time-limits';

// Actions

export const getEntities: ICrudGetAllAction<ITimeLimits> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIMELIMITS_LIST,
  payload: axios.get<ITimeLimits>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITimeLimits> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIMELIMITS,
    payload: axios.get<ITimeLimits>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITimeLimits> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIMELIMITS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITimeLimits> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIMELIMITS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITimeLimits> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIMELIMITS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
