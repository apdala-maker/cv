import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILost, defaultValue } from 'app/shared/model/lost.model';

export const ACTION_TYPES = {
  FETCH_LOST_LIST: 'lost/FETCH_LOST_LIST',
  FETCH_LOST: 'lost/FETCH_LOST',
  CREATE_LOST: 'lost/CREATE_LOST',
  UPDATE_LOST: 'lost/UPDATE_LOST',
  DELETE_LOST: 'lost/DELETE_LOST',
  RESET: 'lost/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILost>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LostState = Readonly<typeof initialState>;

// Reducer

export default (state: LostState = initialState, action): LostState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LOST):
    case REQUEST(ACTION_TYPES.UPDATE_LOST):
    case REQUEST(ACTION_TYPES.DELETE_LOST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LOST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOST):
    case FAILURE(ACTION_TYPES.CREATE_LOST):
    case FAILURE(ACTION_TYPES.UPDATE_LOST):
    case FAILURE(ACTION_TYPES.DELETE_LOST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOST):
    case SUCCESS(ACTION_TYPES.UPDATE_LOST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOST):
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

const apiUrl = 'api/losts';

// Actions

export const getEntities: ICrudGetAllAction<ILost> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOST_LIST,
  payload: axios.get<ILost>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILost> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOST,
    payload: axios.get<ILost>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILost> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILost> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILost> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOST,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
