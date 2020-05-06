import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFound, defaultValue } from 'app/shared/model/found.model';

export const ACTION_TYPES = {
  FETCH_FOUND_LIST: 'found/FETCH_FOUND_LIST',
  FETCH_FOUND: 'found/FETCH_FOUND',
  CREATE_FOUND: 'found/CREATE_FOUND',
  UPDATE_FOUND: 'found/UPDATE_FOUND',
  DELETE_FOUND: 'found/DELETE_FOUND',
  RESET: 'found/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFound>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FoundState = Readonly<typeof initialState>;

// Reducer

export default (state: FoundState = initialState, action): FoundState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOUND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FOUND):
    case REQUEST(ACTION_TYPES.UPDATE_FOUND):
    case REQUEST(ACTION_TYPES.DELETE_FOUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOUND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOUND):
    case FAILURE(ACTION_TYPES.CREATE_FOUND):
    case FAILURE(ACTION_TYPES.UPDATE_FOUND):
    case FAILURE(ACTION_TYPES.DELETE_FOUND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOUND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOUND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOUND):
    case SUCCESS(ACTION_TYPES.UPDATE_FOUND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOUND):
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

const apiUrl = 'api/founds';

// Actions

export const getEntities: ICrudGetAllAction<IFound> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FOUND_LIST,
  payload: axios.get<IFound>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IFound> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOUND,
    payload: axios.get<IFound>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFound> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOUND,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFound> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOUND,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFound> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOUND,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
