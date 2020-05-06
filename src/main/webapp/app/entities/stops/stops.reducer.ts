import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStops, defaultValue } from 'app/shared/model/stops.model';

export const ACTION_TYPES = {
  FETCH_STOPS_LIST: 'stops/FETCH_STOPS_LIST',
  FETCH_STOPS: 'stops/FETCH_STOPS',
  CREATE_STOPS: 'stops/CREATE_STOPS',
  UPDATE_STOPS: 'stops/UPDATE_STOPS',
  DELETE_STOPS: 'stops/DELETE_STOPS',
  RESET: 'stops/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStops>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StopsState = Readonly<typeof initialState>;

// Reducer

export default (state: StopsState = initialState, action): StopsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STOPS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STOPS):
    case REQUEST(ACTION_TYPES.UPDATE_STOPS):
    case REQUEST(ACTION_TYPES.DELETE_STOPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STOPS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STOPS):
    case FAILURE(ACTION_TYPES.CREATE_STOPS):
    case FAILURE(ACTION_TYPES.UPDATE_STOPS):
    case FAILURE(ACTION_TYPES.DELETE_STOPS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STOPS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STOPS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STOPS):
    case SUCCESS(ACTION_TYPES.UPDATE_STOPS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STOPS):
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

const apiUrl = 'api/stops';

// Actions

export const getEntities: ICrudGetAllAction<IStops> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STOPS_LIST,
  payload: axios.get<IStops>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStops> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STOPS,
    payload: axios.get<IStops>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStops> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STOPS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStops> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STOPS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStops> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STOPS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
