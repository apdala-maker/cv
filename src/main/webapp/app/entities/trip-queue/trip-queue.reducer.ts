import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITripQueue, defaultValue } from 'app/shared/model/trip-queue.model';

export const ACTION_TYPES = {
  FETCH_TRIPQUEUE_LIST: 'tripQueue/FETCH_TRIPQUEUE_LIST',
  FETCH_TRIPQUEUE: 'tripQueue/FETCH_TRIPQUEUE',
  CREATE_TRIPQUEUE: 'tripQueue/CREATE_TRIPQUEUE',
  UPDATE_TRIPQUEUE: 'tripQueue/UPDATE_TRIPQUEUE',
  DELETE_TRIPQUEUE: 'tripQueue/DELETE_TRIPQUEUE',
  RESET: 'tripQueue/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITripQueue>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TripQueueState = Readonly<typeof initialState>;

// Reducer

export default (state: TripQueueState = initialState, action): TripQueueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRIPQUEUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRIPQUEUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRIPQUEUE):
    case REQUEST(ACTION_TYPES.UPDATE_TRIPQUEUE):
    case REQUEST(ACTION_TYPES.DELETE_TRIPQUEUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRIPQUEUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRIPQUEUE):
    case FAILURE(ACTION_TYPES.CREATE_TRIPQUEUE):
    case FAILURE(ACTION_TYPES.UPDATE_TRIPQUEUE):
    case FAILURE(ACTION_TYPES.DELETE_TRIPQUEUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPQUEUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRIPQUEUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRIPQUEUE):
    case SUCCESS(ACTION_TYPES.UPDATE_TRIPQUEUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRIPQUEUE):
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

const apiUrl = 'api/trip-queues';

// Actions

export const getEntities: ICrudGetAllAction<ITripQueue> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRIPQUEUE_LIST,
  payload: axios.get<ITripQueue>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITripQueue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRIPQUEUE,
    payload: axios.get<ITripQueue>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITripQueue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRIPQUEUE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITripQueue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRIPQUEUE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITripQueue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRIPQUEUE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
